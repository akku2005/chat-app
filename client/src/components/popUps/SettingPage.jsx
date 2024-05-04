import React, { useState } from "react";
import bg from "../../assets/RegisterImg.png";

const SettingPage = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(bg);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(true);

  const user = {
    avatar: avatar,
    username: "johndoe123",
    email: "john@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    settings: {
      notifications: true,
      darkMode: false,
      language: "English",
    },
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (imageUrl) => {
    setAvatar(imageUrl);
    setGalleryOpen(false); // Close the gallery modal after selecting an image
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
    setGalleryOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to update user settings (e.g., send API request)
    if (name.length && avatar.length > 0) {
      console.log("Name:", name);
      console.log("Avatar:", avatar);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      {popupOpen && (
        <div className="settings-popup p-3 bg-gray-500 shadow-lg rounded-md absolute right-0 top-0 h-full w-64 z-50 justify-center items-center text-center">
          <img
            className="w-18 h-18 rounded-full border-4 border-pink-600 cursor-pointer"
            src={user.avatar}
            alt={user.name}
            onClick={() => setGalleryOpen(true)}
          />

          {galleryOpen && (
            <div className="gallery-modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="gallery-content bg-white p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-2">Select Avatar</h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                <button
                  onClick={() => setGalleryOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="avatar"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Avatar URL:
                </label>
                <input
                  type="text"
                  id="avatar"
                  value={avatar}
                  onChange={() => {}}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
              <div className="flex items-center  justify-center">
                <button
                  type="submit"
                  className="p-1 mt-2 font-bold bg-slate-400 px-12 rounded-md hover:bg-zinc-600"
                >
                  Save
                </button>
              </div>
            </form>
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

export default SettingPage;
