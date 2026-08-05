import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  const data = response.data;
  return {
    _id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role,
    token: data.token,
  };
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  const data = response.data;
  return {
    _id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role,
    token: data.token,
  };
};