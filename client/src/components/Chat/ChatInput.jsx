// // ChatInput.js
// import React, { useState } from "react";
// import EmojiPicker from "./emoji/EmojiPicker";
// import { icons } from "../Common/icons";

// const ChatInput = ({ handleMessageChange, handleSendMessage }) => {
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleChange = (e) => {
//     const newMessage = e.target.value;
//     setMessage(newMessage);
//     handleMessageChange(newMessage);
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//       handleSendMessage(message);
//       setMessage("");
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSend(event);
//     }
//   };

//   return (
//     <div className="flex items-center p-1 relative">
//       <ul className="flex gap-5 p-2">
//         <li className="bg-gray-300 p-2 rounded-lg cursor-pointer">
//           <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//             {icons.find((icon) => icon.id === 3)?.icon}
//           </div>
//         </li>
//         <li className="bg-gray-300 p-2 rounded-lg cursor-pointer">
//           {icons.find((icon) => icon.id === 4)?.icon}
//         </li>
//       </ul>

//       <input
//         type="text"
//         placeholder="Type a message"
//         value={message}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         className="flex-grow outline-none px-3 py-2 bg-transparent border rounded-xl focus:ring-0 text-black border-indigo-500"
//       />

//       <button
//         onClick={handleSend}
//         className="ml-2 bg-black text-pink-600 rounded-full p-2 hover:bg-gray-800 focus:outline-none"
//       >
//         <div style={{ rotate: "-30deg" }}>
//           {icons.find((icon) => icon.id === 5)?.icon}
//         </div>
//       </button>

//       {showEmojiPicker && (
//         <EmojiPicker onSelect={(emoji) => setMessage(message + emoji)} />
//       )}
//     </div>
//   );
// };

// export default ChatInput;

// src/components/Chat/ChatInput.jsx

// import React, { useState } from "react";
// import EmojiPicker from "./emoji/EmojiPicker";
// import { icons } from "../Common/icons";

// const ChatInput = ({ handleMessageChange, handleSendMessage }) => {
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handleChange = (e) => {
//     const newMessage = e.target.value;
//     setMessage(newMessage);
//     if (handleMessageChange) {
//       handleMessageChange(newMessage);
//     }
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//       handleSendMessage(message);
//       setMessage("");
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSend(event);
//     }
//   };

//   const handleEmojiSelect = (emoji) => {
//     const newMessage = message + emoji;
//     setMessage(newMessage);
//     if (handleMessageChange) {
//       handleMessageChange(newMessage);
//     }
//   };

//   return (
//     <div className="flex items-center p-1 relative">
//       <ul className="flex gap-5 p-2">
//         <li className="bg-gray-300 p-2 rounded-lg cursor-pointer">
//           <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//             {icons.find((icon) => icon.id === 3)?.icon}
//           </div>
//         </li>
//         <li className="bg-gray-300 p-2 rounded-lg cursor-pointer">
//           {icons.find((icon) => icon.id === 4)?.icon}
//         </li>
//       </ul>

//       <input
//         type="text"
//         placeholder="Type a message"
//         value={message}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         className="flex-grow outline-none px-3 py-2 bg-transparent border rounded-xl focus:ring-0 text-black border-indigo-500"
//       />

//       <button
//         onClick={handleSend}
//         className="ml-2 bg-black text-pink-600 rounded-full p-2 hover:bg-gray-800 focus:outline-none"
//       >
//         <div style={{ rotate: "-30deg" }}>
//           {icons.find((icon) => icon.id === 5)?.icon}
//         </div>
//       </button>

//       {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
//     </div>
//   );
// };

// export default ChatInput;

import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "./emoji/EmojiPicker";
import { icons } from "../Common/icons";

const ChatInput = ({ handleSendMessage, selectedUserEmail }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // Close the emoji picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString();
      const msgData = {
        to: selectedUserEmail,
        from: "loggedInUserEmail", // Replace with actual logged-in user email
        message,
        timestamp,
      };

      handleSendMessage(msgData); // Send message to the parent component

      // Save message to local storage
      const messages =
        JSON.parse(localStorage.getItem(selectedUserEmail)) || [];
      messages.push(msgData);
      localStorage.setItem(selectedUserEmail, JSON.stringify(messages));

      setMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend(event);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
    setShowEmojiPicker(false); // Close the picker after selecting an emoji
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
        <div style={{ transform: "rotate(-30deg)" }}>
          {icons.find((icon) => icon.id === 5)?.icon}
        </div>
      </button>

      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-12 left-0">
          <EmojiPicker onSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
