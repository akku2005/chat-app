import React from "react";
import backgroundImage from "../../assets/LoginLogo.png";

const PageNotFound = () => {
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(8px)",
        }}
      ></div>
      <div className="relative z-10 text-black text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p>We're sorry, but the page you are looking for does not exist.</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
