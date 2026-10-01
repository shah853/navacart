import api from "./api";

export const getStats = async () => {
	const response = await api.get("/admin/stats");
	return response.data;
};

export const getDashboardStats = getStats;

export const getAllOrders = async (search = "") => {
	const params = search.trim() ? { search: search.trim() } : {};
	const response = await api.get("/admin/orders", { params });
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
