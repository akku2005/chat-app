import React, { useState } from "react";
import { icons } from "./icons";

const AddContact = ({ onClose, onAdd }) => {
  const [socketId, setSocketId] = useState("");

  const handleAddContact = () => {
    // Call the onAdd callback with the socket ID
    onAdd(socketId);
    // Clear input after adding contact
    setSocketId("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Contact</h3>
          <button onClick={onClose}>
            {icons.find((icon) => icon.id === 16)?.icon}
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter socket ID"
          value={socketId}
          onChange={(e) => setSocketId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleAddContact}
          className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddContact;
