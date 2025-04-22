


import React, { useState } from "react";

const RightSidebar = ({ RightsidebarOpen, setRightSidebarOpen, locations }) => {
  const initialWidth = 256;
  const [width, setWidth] = useState(initialWidth);

  const handleCloseSidebar = () => {
    setRightSidebarOpen(false);
  };

  const increaseWidth = () => setWidth(width + 20);

  const decreaseWidth = () => {
    if (width > initialWidth) {
      setWidth(width - 20);
    }
  };

  return (
    // <div
    //   className={`fixed top-0 right-0 mt-16 h-full z-[999] transform transition-transform duration-300 ease-in-out shadow-lg ${
    //     RightsidebarOpen ? "translate-x-0" : "translate-x-full"
    //   }`}
    //   style={{ width: `${width}px`, backgroundColor: "#d9e4ec" }}
    // >
    //   <div className="flex justify-between items-center p-4 border-b border-[#b7cfdc]">
    //     <div className="font-bold text-lg text-[#385e72]">⚙️ Right Sidebar</div>
    //   </div>

    //   <div className="p-4 text-[#385e72]">Yash</div>
    //   <button
    //     onClick={handleCloseSidebar}
    //     className="text-xl font-bold text-[#385e72] hover:text-[#6aabd2] transition"
    //   >
    //     &rarr;
    //   </button>
    //   <ul>
    //     {locations.map((location) => (
    //       <li key={location.id}>{location.location_name}</li>
    //     ))}
    //   </ul>
    //   <div
    //     onClick={increaseWidth}
    //     className="absolute top-1/2 right-4 bg-[#6aabd2] hover:bg-[#385e72] text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
    //     style={{ zIndex: 1000 }}
    //     title="Increase width"
    //   >
    //     +
    //   </div>

    //   <div
    //     onClick={decreaseWidth}
    //     className="absolute top-1/2 right-4 mt-10 bg-[#d9534f] hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
    //     style={{ zIndex: 1000 }}
    //     title="Decrease width"
    //   >
    //     -
    //   </div>
    // </div>

    <div
      className={`fixed top-0 right-0 mt-16 h-full z-[999] transform transition-transform duration-300 ease-in-out  overflow-y-auto max-h-[full] shadow-lg ${
        RightsidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: `${width}px`, backgroundColor: "#d9e4ec" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#b7cfdc]">
        <div className="font-bold text-lg text-[#385e72]">⚙️ Right Sidebar</div>
      </div>

      <div className="p-4 text-[#385e72]">Yash</div>
      <button
        onClick={handleCloseSidebar}
        className="text-xl font-bold text-[#385e72] hover:text-[#6aabd2] transition"
      >
        &rarr;
      </button>

      <ul >
        {" "}
        {/* Makes the list scrollable */}
        {locations.map((location) => (
          <li key={location.id}>{location.location_name}</li>
        ))}
      </ul>

      <div
        onClick={increaseWidth}
        className="absolute top-1/2 right-4 bg-[#6aabd2] hover:bg-[#385e72] text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
        style={{ zIndex: 1000 }}
        title="Increase width"
      >
        +
      </div>

      <div
        onClick={decreaseWidth}
        className="absolute top-1/2 right-4 mt-10 bg-[#d9534f] hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-md transition"
        style={{ zIndex: 1000 }}
        title="Decrease width"
      >
        -
      </div>
    </div>
  );
};

export default RightSidebar;
