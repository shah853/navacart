const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const getAllOrders = async (req, res) => {
	try {
		const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

		if (search) {
			const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const searchRegex = new RegExp(escapedSearch, "i");
			const orders = await Order.aggregate([
				{
					$lookup: {
						from: User.collection.name,
						localField: "user",
						foreignField: "_id",
						as: "user",
					},
				},
				{
					$unwind: {
						path: "$user",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$match: {
						$or: [
							{ "user.name": searchRegex },
							{ "user.email": searchRegex },
							{ "items.name": searchRegex },
						],
					},
				},
				{
					$set: {
						user: {
							_id: "$user._id",
							name: "$user.name",
							email: "$user.email",
						},
					},
				},
				{ $sort: { createdAt: -1 } },
			]);

			return res.status(200).json(orders);
		}

		const orders = await Order.find({})
			.populate("user", "name email")
			.sort({ createdAt: -1 });

		return res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status: req.body.status },
			{ new: true, runValidators: true }
		).populate("user", "name email");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		return res.status(200).json(order);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const updatePaymentStatus = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ paymentStatus: req.body.status || req.body.paymentStatus },
			{ new: true, runValidators: true }
		).populate("user", "name email");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		return res.status(200).json(order);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const getDashboardStats = async (req, res) => {
	try {
		const weeklyStartDate = new Date();
		weeklyStartDate.setUTCHours(0, 0, 0, 0);
		weeklyStartDate.setUTCDate(weeklyStartDate.getUTCDate() - 6);
		const [
			totalOrders,
			pendingOrders,
			deliveredOrders,
			totalProducts,
			totalCustomers,
			revenueResult,
			recentOrders,
			weeklyOrdersResult,
		] = await Promise.all([
			Order.countDocuments(),
			Order.countDocuments({ status: "pending" }),
			Order.countDocuments({ status: "delivered" }),
			Product.countDocuments(),
			User.countDocuments({ role: { $ne: "admin" } }),
			Order.aggregate([
				{ $match: { paymentStatus: "paid" } },
				{ $group: { _id: null, total: { $sum: "$totalAmount" } } },
			]),
			Order.find({})
				.populate("user", "name email")
				.sort({ createdAt: -1 })
				.limit(5),
			Order.find({
				createdAt: { $gte: weeklyStartDate },
			}).select("createdAt"),
		]);

		const weeklyCounts = new Map();
		for (let daysAgo = 6; daysAgo >= 0; daysAgo -= 1) {
			const date = new Date();
			date.setUTCHours(0, 0, 0, 0);
			date.setUTCDate(date.getUTCDate() - daysAgo);
			weeklyCounts.set(date.toISOString().slice(0, 10), {
				label: date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
				orders: 0,
			});
		}

		weeklyOrdersResult.forEach((order) => {
			const dateKey = new Date(order.createdAt).toISOString().slice(0, 10);
			const day = weeklyCounts.get(dateKey);
			if (day) day.orders += 1;
		});

		return res.status(200).json({
			totalOrders,
			pendingOrders,
			deliveredOrders,
			totalProducts,
			totalCustomers,
			totalRevenue: revenueResult[0]?.total || 0,
			weeklyOrders: Array.from(weeklyCounts.values()),
			recentOrders,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort({ createdAt: -1 });
		return res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getAllCustomers = async (req, res) => {
	try {
		const [customers, orderCounts] = await Promise.all([
			User.find({ role: { $ne: "admin" } }).select("-password").sort({ createdAt: -1 }).lean(),
			Order.aggregate([
				{ $group: { _id: "$user", totalOrders: { $sum: 1 } } },
			]),
		]);
		const countsByUser = new Map(
			orderCounts.map((entry) => [entry._id.toString(), entry.totalOrders])
		);

		return res.status(200).json(
			customers.map((customer) => ({
				...customer,
				totalOrders: countsByUser.get(customer._id.toString()) || 0,
			}))
		);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllOrders,
	updateOrderStatus,
	updatePaymentStatus,
	getDashboardStats,
	getAllProducts,
	getAllCustomers,
};
