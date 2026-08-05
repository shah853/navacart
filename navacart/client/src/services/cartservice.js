import api from "./api";
 export const getcart = async () => {
   const response = await api.get("/cart");
   return response.data;
 }
 export const addToCartAPI= async (productId, quantity) => {
   const response = await api.post("/cart", { productId, quantity });
   return response.data;
 }
 export const updateCartItemAPI = async (productId, quantity) => {
   const response = await api.put(`/cart/${productId}`, { quantity });
   return response.data;
 }
 export const removeFromCartAPI = async (productId) => {
   const response = await api.delete(`/cart/${productId}`);
   return response.data;
 }   
 export const clearCartAPI = async () => { 
    const response = await api.delete("/cart/clear");
    return response.data;
 }