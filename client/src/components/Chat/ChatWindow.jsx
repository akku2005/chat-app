// ChatWindow.jsx
import React, { useState, useEffect } from "react";
import { useSocket } from "../../socket/Socket";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import SideMenu from "./SideMenu";
import { icons } from "../Common/icons";
import AddContact from "../Common/addContact"; // Ensure the path and casing are correct

const ChatWindow = ({ loggedInUserEmail }) => {
  const socket = useSocket();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("private_message", (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: data.sender, message: data.message },
        ]);
      });

      // Cleanup on unmount
      return () => {
        socket.off("private_message");
      };
    }
  }, [socket]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setRecipientEmail(user.email);
  };

  const handlePopupClick = () => {
    setShowPopup(!showPopup);
  };

  const handleAddContact = (socketId) => {
    console.log("Adding contact with socket ID:", socketId);
    // Close the popup
    setShowPopup(false);
  };

  const handleSendMessage = () => {
    if (socket && recipientEmail && message) {
      socket.emit("private_message", { recipientEmail, message });
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideMenu />
      <div className="bg-gray-200 w-1/4 flex flex-col border-r border-gray-300">
        <div className="bg-gray-300 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat</h2>
          <ul className="flex gap-2 list-none cursor-pointer">
            <li onClick={handlePopupClick} className="text-gray-700">
              {icons.find((icon) => icon.id === 15)?.icon}
            </li>
            <li className="text-gray-700">
              {icons.find((icon) => icon.id === 16)?.icon}
            </li>
          </ul>
        </div>
        <div className="p-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="w-full px-10 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 text-gray-800"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {icons.find((icon) => icon.id === 17)?.icon}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <UserList
            onUserClick={handleUserClick}
            loggedInUserEmail={loggedInUserEmail}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-white p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="chat-messages space-y-2">
              {selectedUser && (
                <ChatMessage
                  selectedUser={selectedUser}
                  loggedInUserEmail={loggedInUserEmail}
                  messages={messages}
                />
              )}
            </div>
          </div>
          {selectedUser && (
            <div className="bg-gray-100 p-4 border-t border-gray-300">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500 text-gray-800"
              />
              <button
                onClick={handleSendMessage}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <AddContact onClose={handlePopupClick} onAdd={handleAddContact} />
      )}
    </div>
  );
};

export default ChatWindow;
