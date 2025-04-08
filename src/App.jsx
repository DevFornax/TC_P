import { useState } from "react";
import "./index.css";
import TopBar from "./Components/Topbar";
import Homepage from "./Components/Homepage";
import SLD from "./Components/SLD/DynamicSLD";

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Routes and Route

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sld-view" element={<SLD />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
