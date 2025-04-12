import { BrowserRouter, Routes, Route } from "react-router-dom";

import SLD from "./Components/SLD/DynamicSLD";
import TopBar from "./Components/Topbar";
import Login from "./Components/Login"; // Add this
import PrivateRoute from "./Components/PrivateRoute"; // Add this
import Dashboard from "./Components/Dashboard/Dashboard";
import EntryPage from "./Components/EntryPage";

function App() {
  return (
    <BrowserRouter>
      {/* {localStorage.getItem("isLoggedIn") === "true" && <TopBar />} */}

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="/sld-view"
          element={
            <PrivateRoute>
              <SLD />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
            <EntryPage/>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
