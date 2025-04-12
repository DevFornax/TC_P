import React from "react";
import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

      <p className="text-center text-2xl font-semibold mb-8">
        Welcome to IntelliGIS
      </p>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
       
        <div
          onClick={() => navigate("/dashboard")}
          className="bg-white shadow-md rounded-xl p-6 text-center cursor-pointer hover:bg-gray-100 transition"
        >
          <h2 className="text-xl font-bold">Insert Data</h2>
          <p className="text-gray-500">Form or inputs go here</p>
        </div>

       
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">Report</h2>
          <p className="text-gray-500">Data display or logs here</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">Dummy 1</h2>
          <p className="text-gray-500">Some placeholder or component</p>
        </div>

  
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold">Dummy 2</h2>
          <p className="text-gray-500">Another placeholder</p>
        </div>
      </div>
    </div>
  );
}
