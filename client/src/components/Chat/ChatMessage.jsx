import React, { useState, useEffect } from "react";
import { useSocket } from "../../socket/Socket"; // Make sure this hook is correctly implemented
import ChatInput from "./ChatInput";
import { icons } from "../Common/icons";
import defaultImage from "../../assets/9440461.jpg";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatMessage = ({ selectedUser, loggedInUserEmail }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (socket && selectedUser) {
      // Load messages from local storage for the selected user
      const savedMessages =
        JSON.parse(localStorage.getItem(selectedUser.email)) || [];
      setMessages(savedMessages);

      // Define handlers
      const handlePrivateMessage = (data) => {
        const newMessage = {
          message:
            typeof data.message === "string"
              ? data.message
              : JSON.stringify(data.message),
          from: data.from,
          to: data.to,
        };

        if (
          (data.to === selectedUser.email ||
            data.from === selectedUser.email) &&
          (data.to === loggedInUserEmail || data.from === loggedInUserEmail)
        ) {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            localStorage.setItem(
              selectedUser.email,
              JSON.stringify(updatedMessages)
            );
            return updatedMessages;
          });
        }
      };

      const handleUpdateOnlineUsers = (users) => {
        setOnlineUsers(users);
      };

      // Set up socket listeners
      socket.on("private_message", handlePrivateMessage);
      socket.on("updateOnlineUsers", handleUpdateOnlineUsers);

      // Emit the user ID for the current socket
      socket.emit("setUserId", loggedInUserEmail);

      // Cleanup on component unmount
      return () => {
        socket.off("private_message", handlePrivateMessage);
        socket.off("updateOnlineUsers", handleUpdateOnlineUsers);
      };
    }
  }, [selectedUser, loggedInUserEmail, socket]);

  const handleSendMessage = () => {
    const messageData = {
      message: String(message),
      from: loggedInUserEmail,
      to: selectedUser.email,
    };

    if (onlineUsers.includes(selectedUser.email)) {
      socket.emit("private_message", messageData);
    } else {
      alert(
        "Recipient is not online. Your message will be saved but not delivered."
      );
    }

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, messageData];
      localStorage.setItem(selectedUser.email, JSON.stringify(updatedMessages));
      return updatedMessages;
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      {selectedUser && (
        <div className="flex flex-col h-screen">
          <div className="flex items-center gap-5 font-semibold justify-between bg-zinc-700 p-2 text-white rounded-md">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={selectedUser.avatar || defaultImage}
                alt={selectedUser.userName}
              />
              <p>{selectedUser.userName}</p>
            </div>
            <ul className="flex gap-3 p-2 justify-between">
              <li className="bg-slate-400 rounded-xl p-2 hover:bg-slate-500 hover:text-green-400 cursor-pointer">
                {icons.find((icon) => icon.id === 1)?.icon}
              </li>
              <li className="bg-slate-400 rounded-xl p-2 hover:bg-slate-500 hover:text-green-400 cursor-pointer">
                {icons.find((icon) => icon.id === 2)?.icon}
              </li>
            </ul>
          </div>
          <ScrollToBottom className="flex-1 bg-gray-300 rounded-lg p-5 mt-1 overflow-hidden overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 mb-2 ${
                  msg.from === loggedInUserEmail
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.from === loggedInUserEmail ? (
                  <div className="flex items-end">
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.from === loggedInUserEmail
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white text-black rounded-bl-none"
                      } border border-gray-300`}
                    >
                      <div className="text-sm font-medium">You</div>
                      <div className="text-sm">{String(msg.message)}</div>
                    </div>
                    <img
                      className="w-8 h-8 rounded-full ml-2"
                      src={defaultImage}
                      alt="Logged in user"
                    />
                  </div>
                ) : (
                  <>
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={selectedUser.avatar || defaultImage}
                      alt={selectedUser.userName}
                    />
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.from === loggedInUserEmail
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white text-black rounded-bl-none"
                      } border border-gray-300`}
                    >
                      <div className="text-sm font-medium">
                        {selectedUser.userName}
                      </div>
                      <div className="text-sm">{String(msg.message)}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </ScrollToBottom>
          <div className="mb-5">
            <ChatInput
              handleSendMessage={handleSendMessage}
              message={message}
              setMessage={setMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
