// components/TopBar/index.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      {user ? (
        <>
          Hi {user.first_name}
          <button onClick={() => navigate("/add-photo")}>Add Photo</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        "Please Login"
      )}
    </div>
  );
};

export default TopBar;
