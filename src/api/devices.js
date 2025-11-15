import API from "./axiosInstance";


export const getDevices = async () => {
  const res = await API.get(`/device`);
  return res.data;
};

export const createDevice = async (payload) => {
  const res = await API.post(`/device`, payload);
  return res.data;
};

export const updateDevice = async (id, payload) => {
  const res = await API.put(`/device/${id}`, payload);
  return res.data;
};

export const deleteDevice = async (id) => {
  const res = await API.delete(`/device/${id}`);
  return res.data;
};
