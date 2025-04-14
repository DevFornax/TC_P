import React from "react";
import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Inspection Tool",
      route: "/inspection",
      image: "/inspection.jpg",
    },
    {
      title: "Inspection Data",
      route: "/data-inspection",
      image: "/Report.jpg",
    },

    {
      title: "Inspection Data",
      route: "/data-inspection",
      image: "/Report.jpg",
    },
    {
      title: "Inspection Tool",
      route: "/inspection",
      image: "/inspection.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome to <span className="text-blue-600">Fornax ThermoVis</span>
      </h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="relative h-48 rounded-lg overflow-hidden shadow-md cursor-pointer group"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white font-semibold text-lg p-3 text-center">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
