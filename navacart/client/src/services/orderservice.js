import api from "./api";

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const checkoutOrder = async (orderData) => {
  const response = await api.post("/orders/checkout", orderData);
  return response.data;
};

export const trackOrder = async (id) => {
  const response = await api.get(`/orders/track/${id}`);
  return response.data;
};

export const updateOrder = async (id, updateData) => {
  const response = await api.put(`/orders/${id}`, updateData);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders/all");
  return response.data;
};