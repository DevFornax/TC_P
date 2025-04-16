
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_SECRET || "a9d94nfn54kYH42jALK1245jJaq1J0a3mt43q24mnv2kjf45e3a1d3249f6b9e745b088a28f4b85a211bd4b8e10a1cf6344fdf38382c91b2d4";

export const saveAuthData = (authObj) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(authObj),
    secretKey
  ).toString();
  localStorage.setItem("auth", encrypted);
};

export const getAuthData = () => {
  const encrypted = localStorage.getItem("auth");
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Auth decrypt error:", err);
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("auth");
};
