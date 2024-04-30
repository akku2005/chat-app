import React from "react";

const AddContact = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex  bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 m-5 rounded-lg h-80 ml-80 text-center ">
        <h1 className=" font-bold text-xl">New Chat</h1>
        <input
          type="text"
          placeholder="Search contact"
          className="border p-4 h-8 w-64 focus:outline-none mt-5 mb-5 rounded-lg"
          style={{ borderBottom: "4px solid #25D366" }}
        />
        <div className="flex mt-3 bg-slate-200 p-2 rounded-lg items-center gap-2 font-semibold cursor-pointer ">
          <p className="text-green-500 bg-slate-300 p-2 rounded-lg hover:bg-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </p>
          <h1>Add Contact</h1>
        </div>
        <div className="flex mt-3 bg-slate-200 p-2 rounded-lg items-center gap-2 font-semibold cursor-pointer">
          <p className="text-green-500 bg-slate-300 p-2 rounded-lg hover:bg-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          </p>
          <h1>Create Group</h1>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
