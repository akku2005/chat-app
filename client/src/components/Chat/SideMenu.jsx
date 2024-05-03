import React, { useEffect, useState, useRef } from "react";
import { icons } from "../Common/icons";
import SettingsPopup from "../popUps/SettingsPopup"; // Import the SettingsPopup component

const SideMenu = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const handleClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-zinc-800 flex flex-col justify-between h-full">
      <div className="gap-5 justify-between text-white">
        <p className="p-3 mt-14 flex flex-col gap-3 justify-between text-white items-center">
          <li className="list-none hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 6)?.icon}
          </li>
          <li className="list-none hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 7)?.icon}
          </li>
          <li className="list-none hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 8)?.icon}
          </li>
        </p>
      </div>
      <div className="flex justify-center items-center mb-7">
        <p className="p-3 mt-14 flex flex-col gap-3 justify-between text-white items-center">
          <li className="list-none hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 9)?.icon}
          </li>
          <li className="list-none hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 10)?.icon}
          </li>
          <li className="list-none hover:text-green-500 cursor-pointer">
            {icons.find((icon) => icon.id === 11)?.icon}
          </li>
          <li
            className="list-none hover:text-pink-500 cursor-pointer"
            onClick={handleClick}
          >
            {icons.find((icon) => icon.id === 12)?.icon}
          </li>
        </p>
      </div>
      {isSettingsOpen && (
        <div className="settings-popup-container">
          <SettingsPopup />
        </div>
      )}
    </div>
  );
};

export default SideMenu;
