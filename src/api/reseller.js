import API from "./axiosInstance";

// Get all resellers
export const getResellers = async () => {
  const response = await API.get("/reseller");
  return response.data;
};

// Create a new reseller
export const createReseller = async (data) => {
  const response = await API.post("/reseller", data);
  return response.data;
};

// Update reseller by id
export const updateReseller = async (id, data) => {
  const response = await API.put(`/reseller/${id}`, data);
  return response.data;
};

// Delete reseller by id
export const deleteReseller = async (id) => {
  const response = await API.delete(`/reseller/${id}`);
  return response.data;
};
