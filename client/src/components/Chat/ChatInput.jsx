// ChatInput.js
import React, { useState } from "react";
import EmojiPicker from "./emoji/EmojiPicker";
import { icons } from "../Common/icons";

const ChatInput = ({ handleMessageChange, handleSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    handleMessageChange(newMessage);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      handleSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend(event);
    }
  };

  return (
    <div className="flex items-center p-1 relative">
      <ul className="flex gap-5 p-2">
        <li className="bg-gray-300 p-2 rounded-lg cursor-pointer">
          <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            {icons.find((icon) => icon.id === 3)?.icon}
          </div>
        </li>
        <li className="bg-gray-300 p-2 rounded-lg cursor-pointer">
          {icons.find((icon) => icon.id === 4)?.icon}
        </li>
      </ul>

      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-grow outline-none px-3 py-2 bg-transparent border rounded-xl focus:ring-0 text-black border-indigo-500"
      />

      <button
        onClick={handleSend}
        className="ml-2 bg-black text-pink-600 rounded-full p-2 hover:bg-gray-800 focus:outline-none"
      >
        <div style={{ rotate: "-30deg" }}>
          {icons.find((icon) => icon.id === 5)?.icon}
        </div>
      </button>

      {showEmojiPicker && (
        <EmojiPicker onSelect={(emoji) => setMessage(message + emoji)} />
      )}
    </div>
  );
};

export default ChatInput;
