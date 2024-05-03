// import React, { useState } from "react";
// import ChatMessage from "./ChatMessage";
// import UserList from "./UserList";
// import SideMenu from "./SideMenu";
// // import AddContact from "../Common/AddContact";

// const ChatWindow = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//   };

//   const handlePopupClick = () => {
//     setShowPopup(!showPopup);
//   };

//   return (
//     <div className="adb fixed top-0 left-0 w-full h-full overflow-hidden">
//       <div className="flex h-full">
//         <SideMenu />
//         <div className="bg-black w-1/5 flex flex-col">
//           <div className="bg-gray-300 p-4 flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Chat</h2>
//             <ul className="flex gap-2 list-none cursor-pointer">
//               <li onClick={handlePopupClick}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
//                   />
//                 </svg>
//               </li>
//               <li>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-5 h-5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
//                   />
//                 </svg>
//               </li>
//             </ul>
//           </div>
//           <div className="p-4 relative">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search or start a new chat"
//                 className="w-full px-10 py-1 pl-12 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 text-black"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none text-gray-400"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto text-center">
//             <UserList onUserClick={handleUserClick} />
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col">
//           <div className="flex-1 bg-white p-4 overflow-hidden">
//             <div className="chat-messages text-black">
//               <ChatMessage selectedUser={selectedUser} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Corrected component name to use uppercase */}
//       {showPopup && <AddContact />}
//     </div>
//   );
// };

// export default ChatWindow;

// import React, { useState, useEffect } from "react";
// import ChatInput from "./ChatInput";
// import ChatMessage from "./ChatMessage";
// import UserList from "./UserList";
// import userData from "../../assets/userList.json";
// import SideMenu from "./SideMenu";

// const ChatWindow = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data from the assets folder
//     // Replace this with actual fetch logic if needed
//     setUsers(userData);
//   }, []);

//   // Filter users based on search query
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="adb fixed top-0 left-0 w-full h-full overflow-hidden">
//       <div className="flex h-full">
//         <SideMenu />
//         <div className="bg-gray-200 w-1/5 flex flex-col">
//           <div className="bg-gray-300 p-4 flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Chat</h2>
//             <p className="flex items-end justify-end gap-2">
//               {/* Search Input */}
//               <input
//                 type="text"
//                 placeholder="Search or start a new chat"
//                 className="w-40 px-2 py-1 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               {/* Other icons */}
//             </p>
//           </div>
//           {/* User List */}
//           <div className="p-4 relative">
//             {filteredUsers.map((user, index) => (
//               <div
//                 key={index}
//                 className="user-card bg-white rounded-lg p-2 mb-2 flex items-center"
//               >
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <p className="text-sm">{user.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Chat Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Messages */}
//           <div className="flex-1 bg-white p-4 overflow-hidden">
//             <div className="chat-messages text-black">
//               <ChatMessage />
//               {/* Additional ChatMessage components */}
//             </div>
//           </div>
//           {/* Input */}
//           <div className="bg-gray-200 p-0">
//             <ChatInput />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import SideMenu from "./SideMenu";
// import AddContact from "../Common/AddContact";

const ChatWindow = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="adb fixed top-0 left-0 w-full h-full overflow-hidden">
      <div className="flex h-full">
        <SideMenu />
        <div className="bg-black w-1/5 flex flex-col">
          <div className="bg-black p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
            <ul className="flex gap-2 list-none cursor-pointer">
              <li onClick={handlePopupClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </li>
            </ul>
          </div>
          <div className="p-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search or start a new chat"
                className="w-full px-10 py-1 pl-12 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 text-black"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto text-center">
            <UserList onUserClick={handleUserClick} />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black p-4 overflow-hidden">
            <div className="chat-messages text-black">
              <ChatMessage selectedUser={selectedUser} />
            </div>
          </div>
        </div>
      </div>
      {/* Corrected component name to use uppercase */}
      {showPopup && <AddContact />}
    </div>
  );
};

export default ChatWindow;

// import React, { useState, useEffect } from "react";
// import ChatInput from "./ChatInput";
// import ChatMessage from "./ChatMessage";
// import UserList from "./UserList";
// import userData from "../../assets/userList.json";
// import SideMenu from "./SideMenu";

// const ChatWindow = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data from the assets folder
//     // Replace this with actual fetch logic if needed
//     setUsers(userData);
//   }, []);

//   // Filter users based on search query
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="adb fixed top-0 left-0 w-full h-full overflow-hidden">
//       <div className="flex h-full">
//         <SideMenu />
//         <div className="bg-gray-200 w-1/5 flex flex-col">
//           <div className="bg-gray-300 p-4 flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Chat</h2>
//             <p className="flex items-end justify-end gap-2">
//               {/* Search Input */}
//               <input
//                 type="text"
//                 placeholder="Search or start a new chat"
//                 className="w-40 px-2 py-1 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               {/* Other icons */}
//             </p>
//           </div>
//           {/* User List */}
//           <div className="p-4 relative">
//             {filteredUsers.map((user, index) => (
//               <div
//                 key={index}
//                 className="user-card bg-white rounded-lg p-2 mb-2 flex items-center"
//               >
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <p className="text-sm">{user.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Chat Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Messages */}
//           <div className="flex-1 bg-white p-4 overflow-hidden">
//             <div className="chat-messages text-black">
//               <ChatMessage />
//               {/* Additional ChatMessage components */}
//             </div>
//           </div>
//           {/* Input */}
//           <div className="bg-gray-200 p-0">
//             <ChatInput />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
