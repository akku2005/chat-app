import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import SideMenu from "./SideMenu";
import { icons } from "../Common/icons";
import AddContact from "../Common/addContact"; // Ensure the path and casing are correct

const ChatWindow = ({ loggedInUserEmail }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  const handleAddContact = (socketId) => {
    console.log("Adding contact with socket ID:", socketId);
    // Close the popup
    setShowPopup(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
      <div className="flex h-full">
        <SideMenu />
        <div className="bg-zinc-600 w-1/5 flex flex-col">
          <div className="bg-gray-300 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
            <ul className="flex gap-2 list-none cursor-pointer">
              <li onClick={handlePopupClick}>
                {icons.find((icon) => icon.id === 15)?.icon}
              </li>
              <li>{icons.find((icon) => icon.id === 16)?.icon}</li>
            </ul>
          </div>
          <div className="p-4 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search or start a new chat"
                className="w-full px-10 py-1 pl-12 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 text-black"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {icons.find((icon) => icon.id === 17)?.icon}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto text-center">
            <UserList
              onUserClick={handleUserClick}
              loggedInUserEmail={loggedInUserEmail}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-white p-4 overflow-hidden">
            <div className="chat-messages text-black">
              {selectedUser && (
                <ChatMessage
                  selectedUser={selectedUser}
                  loggedInUserEmail={loggedInUserEmail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <AddContact onClose={handlePopupClick} onAdd={handleAddContact} />
      )}
    </div>
  );
};

export default ChatWindow;
