import React from "react";
import "../../styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 flex flex-col items-center">
        <div className="mt-12 text-gray-600">Loading...!</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
