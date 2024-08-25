// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import io from "socket.io-client";
// import RegisterImg from "../../assets/RegisterImg.png";
// import { icons } from "../Common/icons";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:6060/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const { accessToken, refreshToken, userId } = response.data;

//         // Store tokens and user ID in session storage
//         window.sessionStorage.setItem("accessToken", accessToken);
//         window.sessionStorage.setItem("refreshToken", refreshToken);
//         window.sessionStorage.setItem("userId", userId);

//         // Connect to socket and authenticate
//         const socket = io();
//         socket.emit("authenticate", { userId });

//         // Redirect user to chat window
//         window.location.href = "/chat-window";
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
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
//                     {showPassword
//                       ? icons.find((icon) => icon.id === 13)?.icon
//                       : icons.find((icon) => icon.id === 14)?.icon}
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
//                 <button
//                   type="submit"
//                   className="block w-full bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 text-white rounded-lg px-3 py-3 font-semibold"
//                 >
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
//               To skip authentication, use email:{" "}
//               <span className="text-blue-500">akash@gmail.com</span> and
//               password: <span className="text-blue-500">password</span>
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
import RegisterImg from "../../assets/RegisterImg.png";
import { icons } from "../Common/icons";
import io from "socket.io-client"; // Ensure this import is here

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
        const { accessToken, refreshToken, userId } = response.data;

        // Store tokens and user ID in session storage
        window.sessionStorage.setItem("accessToken", accessToken);
        window.sessionStorage.setItem("refreshToken", refreshToken);
        window.sessionStorage.setItem("userId", userId);

        // Redirect user to chat window
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
                    {showPassword
                      ? icons.find((icon) => icon.id === 13)?.icon
                      : icons.find((icon) => icon.id === 14)?.icon}
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
