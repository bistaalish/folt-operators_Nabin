import API from "./axiosInstance";

// Get all users
export const getUsers = async () => {
  const response = await API.get("/user");
  return response.data;
};

// Create a new user
export const createUser = async (data) => {
  const response = await API.post("/user", data);
  return response.data;
};

// Update user by id
export const updateUser = async (id, data) => {
  const response = await API.put(`/user/${id}`, data);
  return response.data;
};

// Delete user by id
export const deleteUser = async (id) => {
  const response = await API.delete(`/user/${id}`);
  return response.data;
};

// ✅ Reset user password
export const resetUserPassword = async (id, payload) => {
  const res = await API.post(`/user/${id}/reset-password`, payload);
  return res.data;
};