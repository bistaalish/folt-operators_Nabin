export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  const expireAt = sessionStorage.getItem("expire_at");

  if (!token || !expireAt) return false;

  if (Date.now() > Number(expireAt)) {
    sessionStorage.clear();
    return false;
  }

  return true;
};

export const logout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};
