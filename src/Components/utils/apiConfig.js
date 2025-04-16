// utils/apiConfig.js

const getAuthToken = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.token || null;
};

const API_URL = import.meta.env.VITE_API_BASE_URL;

export { getAuthToken, API_URL };
