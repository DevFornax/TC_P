import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FourOFour() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {

    localStorage.removeItem("auth");

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d9e4ec] px-4">
      <div className="text-center max-w-md">
        <img
          src="/404.svg"
          alt="404 Not Found"
          className="w-full max-w-xs mx-auto mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-[#385e72] mb-4">
          Oops! Page not found.
        </h1>
        <p className="text-[#385e72] text-base md:text-lg mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <p className="text-[#385e72] text-lg font-semibold">
          Taking you to Home  in {countdown}...
        </p>
      </div>
    </div>
  );
}

export default FourOFour;
