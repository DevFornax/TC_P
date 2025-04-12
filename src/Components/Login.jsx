// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("token", data.token);

//         navigate("/");
//       } else {
//         alert("Login failed: " + (data.message || "Unknown error"));
//       }
//     } catch (err) {
//       alert("Login failed: " + err.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full border p-2 mb-3"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <div className="relative mb-4">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full border p-2 pr-10"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
//             onClick={() => setShowPassword((prev) => !prev)}
//             title={showPassword ? "Hide Password" : "Show Password"}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </span>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Login failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3 bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg">

        <div className="flex justify-center items-center w-full md:w-1/2 p-4">
          <img
            src="/undraw_qa-engineers_kgp8.svg"
            alt="Login Illustration"
            className="w-full md:w-auto aspect-square"
          />
        </div>

        <div className="flex flex-col justify-center p-6 w-full md:w-1/2 lg:pl-12">
          <p className="text-left font-extrabold text-3xl md:text-4xl mb-6">
            Welcome Back 👋
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-gray-300 block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-300 block w-full p-3 pr-12 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white transition duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#6c63ff] hover:bg-[#5951e6]"
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
