import React from "react";

function TopBar() {
  return (
    <div className="flex justify-between items-center bg-bgDark text-light p-4">
      {/* Left Side */}
      <div className="text-left">
        <span className="text-xl font-semibold">Lorem</span>
      </div>

      {/* Right Side */}
      <div className="text-right">
        <span className="text-xl font-semibold">Lorem</span>
      </div>
    </div>
  );
}

export default TopBar;
