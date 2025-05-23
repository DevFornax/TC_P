
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAuthData } from "./utils/authStorage";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    const handleKeyEvent = (e) => {
      setIsCapsLockOn(e.getModifierState("CapsLock"));
    };

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Both fields are required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      const data = res.data;

      if (res.status === 200 && data.success) {
        saveAuthData({
          isLoggedIn: true,
          user: data.user,
          token: data.token,
        });
        navigate("/");
      } else {
        setErrorMsg(data.message || "Unknown error");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message;
      setErrorMsg(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-start min-h-screen p-3 bg-[#d9e4ec] bg-cover bg-center"
      style={{
        backgroundImage: "url('/Thermal Inspection.png')",
      }}
    >
      <div className="flex flex-col w-full max-w-lg md:ml-16 bg-white rounded-lg shadow-2xl border border-[#b7cfdc] overflow-hidden">
        <div className="flex flex-col justify-center p-8 w-full">
          <p className="text-left font-extrabold text-3xl md:text-4xl mb-6 text-[#385e72]">
            Welcome Back 👋
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[#385e72] text-lg font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-[#b7cfdc] block w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6aabd2] text-[#385e72] font-semibold"
              />
            </div>

            <div>
              <label className="block text-[#385e72] text-lg font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-[#b7cfdc] block w-full p-3 pr-12 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#6aabd2] text-[#385e72] font-semibold"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-[#385e72]"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {isCapsLockOn && (
                <div className="text-yellow-600 font-medium text-sm p-2 rounded">
                  ⚠️ Caps Lock is ON
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="text-red-600 font-medium text-sm p-2 rounded">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white transition duration-200 ${
                loading
                  ? "bg-[#b7cfdc] cursor-not-allowed"
                  : "bg-[#517588] hover:bg-[#6aabd2]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
