import api from "./api";

export const getStats = async () => {
	const response = await api.get("/admin/stats");
	return response.data;
};

export const getDashboardStats = getStats;

export const getAllOrders = async () => {
	const response = await api.get("/admin/orders");
	return response.data;
};

export const updateOrderStatus = async (id, status) => {
	const response = await api.put(`/admin/orders/${id}/status`, { status });
	return response.data;
};

export const updatePaymentStatus = async (id, status) => {
	const response = await api.put(`/admin/orders/${id}/payment`, { status });
	return response.data;
};

export const getAllProducts = async () => {
	const response = await api.get("/admin/products");
	return response.data;
};

export const getAllCustomers = async () => {
	const response = await api.get("/admin/customers");
	return response.data;
};
