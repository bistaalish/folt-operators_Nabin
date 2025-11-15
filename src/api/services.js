import API from "./axiosInstance";


export const getServices = async () => {
  const res = await API.get(`/service`);
  return res.data;
};

export const createService = async (payload) => {
  const res = await API.post(`/service`, payload);
  return res.data;
};

export const updateService = async (id, payload) => {
  const res = await API.put(`/service/${id}`, payload);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await API.delete(`/service/${id}`);
  return res.data;
};
