// src/components/TopBar/index.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="top-bar">
      {user ? (
        <>
          Hi {user.first_name}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        "Please Login"
      )}
    </div>
  );
};

export default TopBar;
