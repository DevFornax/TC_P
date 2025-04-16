
import { getAuthData } from "./authStorage";

const getAuthToken = () => {
  const auth = getAuthData();
  const token = auth?.token || null;

  // Always log the token for now
  console.log("JWT Token for API calls:", token);

  return token;
};

const API_URL = import.meta.env.VITE_API_BASE_URL;

export { getAuthToken, API_URL };
