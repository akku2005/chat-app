import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6060/forgot-password",
        {
          email,
        }
      );

      if (response.status === 200) {
        // Display a success message and enable verification step
        setVerificationSent(true);
        setError("");
      } else {
        // Display any error messages returned by the server
        setError(response.data.message);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend server with the verification code
      const response = await axios.post("http://localhost:6060/verify-code", {
        email,
        verificationCode,
      });

      // Check if the verification code is valid
      if (response.status === 200) {
        // Handle successful verification
        console.log(
          "Verification successful. Redirect to reset password page."
        );
      } else {
        // Display any error messages returned by the server
        setError(response.data.message);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-900 rounded-3xl shadow-xl w-full md:max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {verificationSent ? "Verify Code" : "Forgot Password"}
          </h2>
          {verificationSent ? (
            // Render verification code input form
            <form onSubmit={handleVerificationSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="verificationCode"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Verify
              </button>
            </form>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Enter your email address below to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                  type="submit"
                  className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
          <p className="text-sm text-gray-700 mt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
