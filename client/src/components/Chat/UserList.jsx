// import React, { useState, useEffect } from "react";
// import userData from "../../assets/userList.json";

// const UserList = ({ onUserClick }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     setUsers(userData);
//   }, []);

//   const handleClick = (user) => {
//     onUserClick(user);
//   };

//   return (
//     <div className="p-2 flex flex-col items-center">
//       {users.map((user, index) => (
//         <div
//           key={index}
//           className="user-card bg-white rounded-lg p-3 mb-2 flex items-center w-full cursor-pointer"
//           onClick={() => handleClick(user)}
//         >
//           <img
//             src={user.avatar}
//             alt={user.name}
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <p className="text-xl font-semibold">{user.name}</p>
//             <p className="text-gray-500">{user.email}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from "react";
import userData from "../../assets/userList.json";

const UserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleClick = (user) => {
    onUserClick(user);
  };

  return (
    <div className="p-2 flex flex-col items-center">
      {users.map((user, index) => (
        <div
          key={index}
          className="user-card bg-black text-white rounded-lg p-3 mb-2 flex items-center w-full cursor-pointer"
          onClick={() => handleClick(user)}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
