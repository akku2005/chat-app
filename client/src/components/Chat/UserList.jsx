import { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../../assets/9440461.jpg"; // Import the image

const UserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:6060/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleClick = (user) => {
    onUserClick(user);
  };

  return (
    <div className="p-2 flex flex-col items-center">
      {users.map((user, index) => (
        <div
          key={index}
          className="user-card bg-white rounded-lg p-3 mb-2 flex items-center w-full cursor-pointer hover:bg-gray-100"
          onClick={() => handleClick(user)}
        >
          <img
            src={user.avatar || defaultImage}
            alt={user.userName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-xl font-semibold">{user.userName}</p>
            {/* <p className="text-gray-500 text-sm">{user.email}</p> */}
            <p className="text-gray-500 text-sm">{user.img}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
