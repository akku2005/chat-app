// import React, { useEffect, useState, useRef } from "react";
// import { icons } from "../Common/icons";
// import SettingsPage from "../popUps/SettingPage";
// import UserProfilePopup from "../popUps/UserProfile";
// import defaultAvatar from "../../assets/profile.png";

// const SideMenu = () => {
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
//   const [userProfileImage, setUserProfileImage] = useState(null);
//   const settingsRef = useRef(null);
//   const userProfileRef = useRef(null);

//   const handleSettingsClick = () => {
//     setIsSettingsOpen(!isSettingsOpen);
//   };

//   const handleUserProfileClick = () => {
//     setIsUserProfileOpen(!isUserProfileOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (
//       settingsRef.current &&
//       !settingsRef.current.contains(event.target) &&
//       userProfileRef.current &&
//       !userProfileRef.current.contains(event.target)
//     ) {
//       setIsSettingsOpen(false);
//       setIsUserProfileOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSetProfileImage = (image) => {
//     setUserProfileImage(image);
//   };

//   return (
//     <div className="bg-zinc-800 flex flex-col justify-between h-full ">
//       <div className="gap-5 justify-between text-white fixed">
//         <ul className="p-3 mt-16 flex flex-col gap-3 justify-between text-white items-center list-none">
//           <li className="hover:text-green-500 cursor-pointer">
//             {icons.find((icon) => icon.id === 6)?.icon}
//           </li>
//           <li className="hover:text-green-500 cursor-pointer">
//             {icons.find((icon) => icon.id === 7)?.icon}
//           </li>
//           <li className="hover:text-green-500 cursor-pointer">
//             {icons.find((icon) => icon.id === 8)?.icon}
//           </li>
//         </ul>
//       </div>
//       <div className="flex justify-center items-center mb-7 mt-32">
//         <ul className="p-3 mt-96 flex flex-col gap-3 justify-between text-white items-center list-none">
//           <li className="hover:text-green-500 cursor-pointer">
//             {icons.find((icon) => icon.id === 9)?.icon}
//           </li>
//           <li className="hover:text-green-500 cursor-pointer">
//             {icons.find((icon) => icon.id === 10)?.icon}
//           </li>
//           <li
//             className="hover:text-green-500 cursor-pointer"
//             onClick={handleSettingsClick}
//           >
//             {icons.find((icon) => icon.id === 11)?.icon}
//           </li>
//           <li
//             className="hover:text-pink-500 cursor-pointer"
//             onClick={handleUserProfileClick}
//           >
//             {icons.find((icon) => icon.id === 12)?.icon instanceof Function ? (
//               icons
//                 .find((icon) => icon.id === 12)
//                 ?.icon({
//                   userProfileImage,
//                   handleSetProfileImage,
//                 })
//             ) : (
//               <img
//                 src={defaultAvatar}
//                 alt="Default Avatar"
//                 className="w-6 h-6 rounded-full"
//               />
//             )}
//           </li>
//         </ul>
//       </div>

//       {isSettingsOpen && (
//         <div className="settings-popup-container" ref={settingsRef}>
//           <SettingsPage />
//         </div>
//       )}
//       {isUserProfileOpen && (
//         <div className="user-profile-popup-container" ref={userProfileRef}>
//           <UserProfilePopup />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SideMenu;

// SideMenu.js

import React, { useEffect, useState, useRef } from "react";
import { icons } from "../Common/icons";
import SettingsPage from "../popUps/SettingPage";
import UserProfilePopup from "../popUps/UserProfile";
import defaultAvatar from "../../assets/profile.png";

const SideMenu = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const settingsRef = useRef(null);
  const userProfileRef = useRef(null);

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
      setIsUserProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setUserProfileImage(storedAvatar);
    }
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
            onClick={handleUserProfileClick}
          >
            {userProfileImage ? (
              <img
                src={userProfileImage}
                alt="User Avatar"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <img
                src={defaultAvatar}
                alt="Default Avatar"
                className="w-6 h-6 rounded-full"
              />
            )}
          </li>
        </ul>
      </div>

      {isSettingsOpen && (
        <div className="settings-popup-container" ref={settingsRef}>
          <SettingsPage userProfileImage={userProfileImage} />
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
