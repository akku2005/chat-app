// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import RegisterImg from "../../assets/RegisterImg.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if entered email and password match the default ones
//       if (email === "akash@gmail.com" && password === "password") {
//         // successful login
//         window.location.href = "/chat-window";
//       } else {
//         // Send a POST request to backend server for user authentication
//         const response = await axios.post("http://localhost:6060/login", {
//           email,
//           password,
//         });

//         // If the server responds with a success message, redirect to the chat window
//         if (response.status === 200) {
//           // Login successful
//           window.location.href = "/chat-window";
//         } else {
//           // If credentials are incorrect, display an error message
//           setError("Something went wrong. Please try again later.");
//         }
//       }
//     } catch (error) {
//       // Handle any network or server errors
//       console.error("Error:", error);
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
//       <div
//         className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
//         style={{ maxWidth: "1000px" }}
//       >
//         <div className="md:flex w-full">
//           <div className="hidden md:block w-1/2 bg-sky-300 py-10 px-10">
//             <img
//               src={RegisterImg}
//               alt="RegisterImg"
//               style={{ borderRadius: "20px" }}
//             />
//           </div>
//           <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
//             <div className="text-center mb-10">
//               <h1 className="font-bold text-3xl">LOGIN</h1>
//               <p className="text-black">Enter your credentials to log in</p>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="mt-4">
//                 <label className="text-xs font-semibold px-1 block">
//                   Email Address
//                 </label>
//                 <input
//                   className="w-full pl-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mt-4 relative">
//                 <label className="text-xs font-semibold px-1 block">
//                   Password
//                 </label>
//                 <input
//                   className="w-full pl-3 py-2 pr-10 rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="focus:outline-none mt-4"
//                   >
//                     {showPassword ? (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//               <div className="text-end text-sm">
//                 <Link
//                   to="/forgot-password"
//                   className="text-indigo-400 hover:underline text-sm"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//               <div className="mt-8">
//                 <button className="block w-full bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white rounded-lg px-3 py-3 font-semibold">
//                   LOGIN
//                 </button>
//               </div>
//               <p className="text-sm text-center mt-4">
//                 Don't have an account?{" "}
//                 <Link to="/sign-up" className="text-indigo-500 hover:underline">
//                   Sign Up
//                 </Link>
//               </p>
//             </form>
//             <p className="text-center text-sm mt-3 text-gray-400">
//               To skip the authentication use email as{" "}
//               <span className="text-blue-500">akash@gmail.com</span> and
//               password as <span className="text-blue-500">password</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import RegisterImg from "../../assets/RegisterImg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6060/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { socketId } = response.data; // Extract the socket ID from the response

        const socket = io("http://localhost:6060");
        socket.emit("authenticate", { socketId });

        window.location.href = "/chat-window";
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-sky-300 py-10 px-10">
            <img
              src={RegisterImg}
              alt="RegisterImg"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl">LOGIN</h1>
              <p className="text-black">Enter your credentials to log in</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="text-xs font-semibold px-1 block">
                  Email Address
                </label>
                <input
                  className="w-full pl-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4 relative">
                <label className="text-xs font-semibold px-1 block">
                  Password
                </label>
                <input
                  className="w-full pl-3 py-2 pr-10 rounded-lg border border-gray-200 outline-none focus:border-indigo-500"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none mt-4"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="text-end text-sm">
                <Link
                  to="/forgot-password"
                  className="text-indigo-400 hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="block w-full bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  LOGIN
                </button>
              </div>
              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-indigo-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
            <p className="text-center text-sm mt-3 text-gray-400">
              To skip authentication, use email:{" "}
              <span className="text-blue-500">akash@gmail.com</span> and
              password: <span className="text-blue-500">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
