import { BrowserRouter, Routes, Route } from "react-router-dom";

import SLD from "./Components/SLD/DynamicSLD";
import TopBar from "./Components/Topbar";
import Login from "./Components/Login"; // Add this
import PrivateRoute from "./Components/PrivateRoute"; // Add this
import Dashboard from "./Components/Dashboard/Dashboard";
import EntryPage from "./Components/EntryPage";
import DataComponent from "./Components/DataComponent";
import GeneratePDF from "./Components/GeneratePDF";

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
              <EntryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/inspection"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-inspection"
          element={
            <PrivateRoute>
              <DataComponent />
            </PrivateRoute>
          }
        />

        <Route
          path="/generate-pdf"
          element={
            <PrivateRoute>
<GeneratePDF />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
