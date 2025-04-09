import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import SLD from "./Components/SLD/DynamicSLD";
import TopBar from "./Components/Topbar";
import Login from "./Components/Login"; // Add this
import PrivateRoute from "./Components/PrivateRoute"; // Add this

function App() {
  return (
    <BrowserRouter>

      {/* {localStorage.getItem("isLoggedIn") === "true" && <TopBar />} */}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />

        <Route
          path="/sld-view"
          element={
            <PrivateRoute>
              <SLD />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
