// import React, { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoadingSpinner from "./components/Common/LoadingSpinner";

// const Login = React.lazy(() => import("./components/Auth/Login"));
// const Signup = React.lazy(() => import("./components/Auth/Signup"));
// const ForgotPassword = React.lazy(() =>
//   import("./components/Auth/ForgotPassword")
// );
// const PageNotFound = React.lazy(() =>
//   import("./components/PageNotFound/PageNotFound")
// );
// const Chatwindow = React.lazy(() => import("./components/Chat/ChatWindow"));

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               {" "}
//               <Login />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               {" "}
//               <Login />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/sign-up"
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               {" "}
//               <Signup />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/forgot-password"
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               {" "}
//               <ForgotPassword />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/chat-window"
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               {" "}
//               <Chatwindow />
//             </Suspense>
//           }
//         />
//         <Route
//           path="*"
//           element={
//             <Suspense fallback={<LoadingSpinner />}>
//               {" "}
//               <PageNotFound />
//             </Suspense>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// App.jsx

// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./socket/Socket"; // Import SocketProvider
import LoadingSpinner from "./components/Common/LoadingSpinner";

// Use React.lazy for code splitting
const Login = React.lazy(() => import("./components/Auth/Login"));
const Signup = React.lazy(() => import("./components/Auth/Signup"));
const ForgotPassword = React.lazy(() =>
  import("./components/Auth/ForgotPassword")
);
const PageNotFound = React.lazy(() =>
  import("./components/PageNotFound/PageNotFound")
);
const ChatWindow = React.lazy(() => import("./components/Chat/ChatWindow"));

function App() {
  return (
    <SocketProvider>
      <Router>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/chat-window" element={<ChatWindow />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </React.Suspense>
      </Router>
    </SocketProvider>
  );
}

export default App;
