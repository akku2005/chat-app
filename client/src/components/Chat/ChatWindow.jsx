import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import SideMenu from "./SideMenu";

const ChatWindow = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user when a user is clicked
  };

  return (
    <div className="adb fixed top-0 left-0 w-full h-full overflow-hidden">
      <div className="flex h-full">
        <SideMenu />
        <div className="bg-gray-200 w-1/5 flex flex-col">
          <div className="bg-gray-300 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
            <p className="flex items-end justify-end gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                {/* SVG code */}
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                {/* SVG code */}
              </svg>
            </p>
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
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400"
              >
                {/* SVG path */}
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto text-center">
            {/* Render UserList component */}
            <UserList onUserClick={handleUserClick} />
          </div>
        </div>
        {/* Chat Content */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 bg-white p-4 overflow-hidden">
            {/* ChatMessages */}
            <div className="chat-messages text-black">
              {/* Render ChatMessage components based on selected user */}
              {selectedUser && <ChatMessage user={selectedUser} />}
            </div>
          </div>
          {/* Input */}
          <div className="bg-gray-200 p-0">
            {/* ChatInput component */}
            <ChatInput />
          </div>
        </div>
      </div>
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
