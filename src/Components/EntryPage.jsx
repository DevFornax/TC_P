
import React from "react";
import Topbar from "../Components/Topbar"
import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Inspection Tool",
      route: "/inspection",
      image: "/form2.svg",
    },
    {
      title: "Inspection Reports",
      route: "/data-dashboard",
      image: "/dashboard.svg",
    },
    {
      title: "Map View",
      route: "/map-view",
      image: "/mapview.svg",
    },
    {
      title: "Inspection Tool",
      route: "/inspection",
      image: "/form.svg",
    },
  ];

  return (
    <>
      <Topbar />
      <div
        className="bg-[#d9e4ec] mt-14 flex flex-col items-center justify-center px-6 py-10"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#385e72] text-center mb-10">
          Welcome to <span className="text-[#6aabd2]">Fornax ThermoVis</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className="bg-gradient-to-br from-[#b7cfdc] to-[#6aabd2] rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer group"
            >
              <div className="relative h-48 flex items-center justify-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-32 object-contain transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="bg-[#385e72] text-white text-lg font-semibold text-center py-3 rounded-b-xl tracking-wide">
                {card.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
