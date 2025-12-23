// components/UserList/index.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

const UserList = () => {
  const { user, refreshUserList } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      setUsers([]); // Ẩn nếu chưa login
      return;
    }
    const loadUsers = async () => {
      try {
        const data = await fetchModel("/api/user/admin/userlist");
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };
    loadUsers();
  }, [user, refreshUserList]);

  return (
    <div>
      <h3>Users</h3>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <Link to={`/users/${user._id}`} className="user-link">
              {user.first_name} {user.last_name}
            </Link>
            <Link to={`/photos/${user._id}`}>
              <span className="bubble photo-bubble">{user.photo_count}</span>
            </Link>

            <Link to={`/comments/${user._id}`}>
              <span className="bubble comment-bubble">
                {user.comment_count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
