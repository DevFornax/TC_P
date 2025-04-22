

import { Navigate } from "react-router-dom";
import { getAuthData, clearAuthData } from "../Components/utils/authStorage";

const PrivateRoute = ({ children }) => {
  const authData = getAuthData();

  if (!authData || !authData.isLoggedIn) {
    clearAuthData();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
