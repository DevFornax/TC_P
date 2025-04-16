// utils/authStorage.js
import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_SECRET || "fallback_secret_key";

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
