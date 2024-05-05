import React, { useState } from "react";
import bg from "../../assets/RegisterImg.png";
import { FiBell, FiMoon, FiGlobe } from "react-icons/fi";

const SettingsPopup = () => {
  const [popupOpen, setPopupOpen] = useState(true);
  const user = {
    avatar: bg,
    name: "John Doe",
    username: "johndoe123",
    email: "john@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    settings: {
      notifications: true,
      darkMode: false,
      language: "English",
    },
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      {popupOpen && (
        <div className="settings-popup p-3 bg-gray-500 shadow-lg rounded-md absolute right-0 top-0 h-full w-64 z-50 justify-center items-center text-center">
          <img
            className="w-18 h-18 rounded-full border-4 border-pink-600"
            src={user.avatar}
            alt={user.name}
          />
          <div className="mt-5">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-700">@{user.username}</p>
            <p className="text-sm text-gray-700 mt-2">Email: {user.email}</p>
            <p className="text-sm text-gray-700 mt-2">{user.bio}</p>
            {/* User Settings */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <div className="flex items-center mt-2 font-semibold">
                <FiBell className="mr-2 text-gray-600" />
                <p className="text-sm text-gray-700">
                  Notifications:{" "}
                  {user.settings.notifications ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div className="flex items-center mt-1 font-semibold">
                <FiMoon className="mr-2 text-gray-600" />
                <p className="text-sm text-gray-700">
                  Dark Mode: {user.settings.darkMode ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div className="flex items-center mt-1 font-semibold">
                <FiGlobe className="mr-2 text-gray-600" />
                <p className="text-sm text-gray-700">
                  Language: {user.settings.language}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={closePopup}
            className="bg-zinc-400 hover:bg-zinc-700 text-black font-bold py-1 px-12 mt-8 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default SettingsPopup;
