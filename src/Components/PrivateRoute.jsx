// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const authData = JSON.parse(localStorage.getItem("auth"));

//   if (!authData || !authData.isLoggedIn) {
//     localStorage.removeItem("auth"); // just in case they’re holding onto stale trash
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;


import { Navigate } from "react-router-dom";
import { getAuthData, clearAuthData } from "../Components/utils/authStorage";

const PrivateRoute = ({ children }) => {
  const authData = getAuthData();

  if (!authData || !authData.isLoggedIn) {
    clearAuthData(); // safely remove encrypted data if invalid or expired
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
