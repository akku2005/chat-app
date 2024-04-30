import React, { useState } from "react";

const EmojiPicker = ({ onSelect }) => {
  // Define an array of emojis
  const emojis = ["😀", "😂", "😊", "😍", "😎", "😜", "😇", "🥳", "🤩", "🤔"];

  // Function to handle emoji selection
  const handleSelectEmoji = (emoji) => {
    // Pass the selected emoji to the onSelect prop
    onSelect(emoji);
  };

  return (
    <div className="absolute bottom-full left-4 mb-2 transform -translate-y-1  border rounded-lg shadow-lg p-2  bg-black text-white ">
      <h2 className="text-center mb-2">Select an emoji:</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleSelectEmoji(emoji)}
            className="emoji-button text-2xl"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
