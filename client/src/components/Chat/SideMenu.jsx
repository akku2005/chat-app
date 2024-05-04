import React, { useEffect, useState, useRef } from "react";
import { icons } from "../Common/icons";
import SettingsPage from "../popUps/SettingPage"; // Import the correct settings page component
import UserProfilePopup from "../popUps/UserProfile"; // Import your user profile popup component

const SideMenu = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false); // State for user profile popup
  const settingsRef = useRef(null);
  const userProfileRef = useRef(null); // Ref for user profile popup container

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleUserProfileClick = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  };

  const handleClickOutside = (event) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target) &&
      userProfileRef.current &&
      !userProfileRef.current.contains(event.target)
    ) {
      setIsSettingsOpen(false);
      setIsUserProfileOpen(false); // Close both popups if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-zinc-800 flex flex-col justify-between h-full ">
      <div className="gap-5 justify-between text-white fixed">
        <ul className="p-3 mt-16 flex flex-col gap-3 justify-between text-white items-center list-none">
          <li className="hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 6)?.icon}
          </li>
          <li className="hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 7)?.icon}
          </li>
          <li className="hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 8)?.icon}
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center mb-7 mt-32">
        <ul className="p-3 mt-96 flex flex-col gap-3 justify-between text-white items-center list-none">
          <li className="hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 9)?.icon}
          </li>
          <li className="hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 10)?.icon}
          </li>
          <li
            className="hover:text-green-500 cursor-pointer"
            onClick={handleSettingsClick}
          >
            {icons.find((icon) => icon.id === 11)?.icon}
          </li>
          <li
            className="hover:text-pink-500 cursor-pointer"
            onClick={handleUserProfileClick} // Handle click for user profile popup
          >
            {icons.find((icon) => icon.id === 12)?.icon}
          </li>
        </ul>
      </div>

      {isSettingsOpen && (
        <div className="settings-popup-container" ref={settingsRef}>
          <SettingsPage />
        </div>
      )}
      {isUserProfileOpen && (
        <div className="user-profile-popup-container" ref={userProfileRef}>
          <UserProfilePopup />
        </div>
      )}
    </div>
  );
};

export default SideMenu;
