import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
});

// Auto-attach token
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  const type = sessionStorage.getItem("token_type");

  if (token) {
    config.headers.Authorization = `${type} ${token}`;
  }

  return config;
});

export default API;
