import API from "./axiosInstance";


export const getDevices = async () => {
  const res = await API.get(`/device`);
  return res.data;
};

export const getDeviceStatus = async (id) => {
  const res = await API.get(`/device/${id}/status`);
  console.log(res.data);
  return res.data.status; // expected: "online" or "offline"
};

// Search ONU by SN
export const searchONUBySN = async (deviceId, sn) => {
  const res = await API.post(`/device/${deviceId}/onu/search/sn`, { sn });
  return res.data; // returns object with status, Description, FSP, SN, ONTID, VendorSN, LineProfile
};

// Reboot ONU
export const rebootONU = async (deviceId, FSP, ONTID) => {
  const res = await API.post(`/device/${deviceId}/onu/reset`, { FSP, ONTID });
  return res.data; // important to return the message
};


// Delete ONU
export const deleteONU = async (deviceId, FSP, ONTID, SN, Description) => {
  const res = await API.delete(`/device/${deviceId}/onu/delete`, {
    data: { FSP, ONTID, SN, Description }
  });
  return res.data;
};
