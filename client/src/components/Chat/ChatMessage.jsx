import React from "react";

const ChatMessage = ({ selectedUser }) => {
  return (
    <div className="">
      {selectedUser && (
        <div className="flex items-center gap-5 font-semibold justify-between bg-zinc-700 p-2 text-white rounded-md">
          <div className="flex items-center gap-3">
            {/* Container for avatar and name */}
            <img
              className="w-12 h-12 rounded-full"
              src={selectedUser.avatar}
              alt={selectedUser.name}
            />
            <p>{selectedUser.name}</p>
          </div>
          <ul className="flex gap-3">
            {/* Container for list items */}
            <li className="p-2 bg-gray-400 rounded-xl hover:bg-gray-600 hover:text-green-400 cursor-pointer">
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </li>
            <li className="p-2 bg-gray-400 rounded-xl hover:bg-gray-600 hover:text-green-400 cursor-pointer">
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
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </li>
          </ul>
        </div>
      )}
      {selectedUser && (
        <div className="bg-gray-200 h-screen mt-2 rounded-lg p-5">absolute</div>
      )}
    </div>
  );
};

export default ChatMessage;
