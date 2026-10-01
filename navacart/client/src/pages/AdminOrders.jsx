import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import OrdersTable from "../components/admin/OrdersTable";
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "../services/adminService";

function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		let active = true;
		const timeout = setTimeout(async () => {
			try {
				const results = await getAllOrders(searchTerm);
				if (active) setOrders(results);
			} catch (requestError) {
				if (active) setError(requestError.response?.data?.message || "Failed to load orders.");
			} finally {
				if (active) setLoading(false);
			}
		}, searchTerm ? 400 : 0);

		return () => {
			active = false;
			clearTimeout(timeout);
		};
	}, [searchTerm]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		setLoading(true);
		setError("");
	};

	const changeOrderField = async (orderId, value, updateRequest, field) => {
		setError("");
		try {
			const updatedOrder = await updateRequest(orderId, value);
			setOrders((currentOrders) => currentOrders.map((order) => (
				order._id === orderId ? { ...order, ...updatedOrder, [field]: value } : order
			)));
		} catch (requestError) {
			setError(requestError.response?.data?.message || "Failed to update the order.");
		}
	};

	return (
		<AdminLayout>
			<div className="mb-6">
				<p className="text-sm font-medium text-teal-700">NavaCart / Admin</p>
				<h1 className="mt-1 text-2xl font-semibold text-slate-900">Orders</h1>
			</div>
			<label className="mb-5 flex w-full max-w-xl items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-400 focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100">
				<span aria-hidden="true">🔍</span>
				<input
					type="search"
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="Search by customer name or product..."
					className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
				/>
			</label>
			{error && <p role="alert" className="mb-4 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
			{loading ? (
				<p className="py-10 text-center text-sm text-slate-500">Searching orders...</p>
			) : orders.length === 0 ? (
				<p className="py-10 text-center text-sm text-slate-500">
					{searchTerm.trim() ? `No orders found for '${searchTerm.trim()}'` : "No orders found."}
				</p>
			) : (
				<OrdersTable
					orders={orders}
					onStatusChange={(id, status) => changeOrderField(id, status, updateOrderStatus, "status")}
					onPaymentChange={(id, status) => changeOrderField(id, status, updatePaymentStatus, "paymentStatus")}
				/>
			)}
		</AdminLayout>
	);
}

export default AdminOrders;
