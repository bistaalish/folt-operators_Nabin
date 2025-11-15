import API from "./axiosInstance";

export const loginUser = async (email, password) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const response = await API.post("/login", params, {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  return response.data;
};
