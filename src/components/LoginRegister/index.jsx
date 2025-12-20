// src/components/LoginRegister/index.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginRegister.css"; // Tạo CSS nếu cần

const LoginRegister = () => {
  const [loginName, setLoginName] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(loginName);
      navigate(`/users/${user._id}`); // Redirect đến user detail
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <h3>Please Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginRegister;
