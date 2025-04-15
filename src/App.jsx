import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurveyDashboard from "./Components/SURVEY/SurveyDashboard";
import EntryPage from "./Components/EntryPage";
import DataComponent from "./Components/DASHBOARD/DataComponent";
import GeneratePDF from "./Components/DASHBOARD/sld-downlaod/GeneratePDF";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
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
              <SurveyDashboard />
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
