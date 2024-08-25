// import { useState, useEffect } from "react";
// import axios from "axios";
// import defaultImage from "../../assets/9440461.jpg"; // Import the image

// const UserList = ({ onUserClick }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:6060/users");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleClick = (user) => {
//     onUserClick(user);
//   };

//   return (
//     <div className="p-2 flex flex-col items-center">
//       {users.map((user, index) => (
//         <div
//           key={index}
//           className="user-card bg-white rounded-lg p-3 mb-2 flex items-center w-full cursor-pointer hover:bg-gray-100"
//           onClick={() => handleClick(user)}
//         >
//           <img
//             src={user.avatar || defaultImage}
//             alt={user.userName}
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <p className="text-xl font-semibold">{user.userName}</p>
//             {/* <p className="text-gray-500 text-sm">{user.email}</p> */}
//             <p className="text-gray-500 text-sm">{user.img}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;

import { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../../assets/9440461.jpg"; // Adjust the path if necessary
import io from "socket.io-client";

const UserList = ({ onUserClick, loggedInUserEmail }) => {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState({});

  useEffect(() => {
    // Establish Socket.IO connection
    const socketConnection = io("http://localhost:6060");
    setSocket(socketConnection);

    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:6060/users");
        const uniqueUsers = getUniqueUsers(response.data);
        setUsers(uniqueUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();

    // Listen for user status updates
    socketConnection.on("userOnline", (email) => {
      setOnlineStatus((prevStatus) => ({ ...prevStatus, [email]: true }));
    });

    socketConnection.on("userOffline", (email) => {
      setOnlineStatus((prevStatus) => ({ ...prevStatus, [email]: false }));
    });

    // Cleanup on component unmount
    return () => {
      socketConnection.disconnect();
    };
  }, [loggedInUserEmail]);

  const getUniqueUsers = (users) => {
    const uniqueEmails = new Set();
    return users.filter((user) => {
      if (!uniqueEmails.has(user.email) && user.email !== loggedInUserEmail) {
        uniqueEmails.add(user.email);
        return true;
      }
      return false;
    });
  };

  const handleClick = (user) => {
    onUserClick(user);

    // Join the user room
    if (socket) {
      socket.emit("joinRoom", { email: user.email });
    }
  };

  return (
    <div className="p-2 flex flex-col items-center">
      {users.map((user, index) => (
        <div
          key={index}
          className="user-card bg-white rounded-lg p-3 mb-2 flex items-center w-full cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(user)}
        >
          <div className="relative">
            <img
              src={user.avatar || defaultImage}
              alt={user.userName}
              className="w-12 h-12 rounded-full mr-4"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                onlineStatus[user.email] ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
          </div>
          <div>
            <p className="text-xl font-semibold">{user.userName}</p>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
