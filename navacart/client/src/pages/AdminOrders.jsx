import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import OrdersTable from "../components/admin/OrdersTable";
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "../services/adminService";

function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadOrders = async () => {
			try {
				setOrders(await getAllOrders());
			} catch (requestError) {
				setError(requestError.response?.data?.message || "Failed to load orders.");
			} finally {
				setLoading(false);
			}
		};

		loadOrders();
	}, []);

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
			{error && <p role="alert" className="mb-4 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
			{loading ? (
				<p className="py-10 text-center text-sm text-slate-500">Loading orders...</p>
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
