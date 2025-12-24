import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./LoginRegister.css";
import axios from "axios";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      if (isLogin) {
        const userData = await login(loginName, password);
        navigate(`/users/${userData._id}`);
      } else {
        const res = await axios.post(
          "https://hhq8qw-8081.csb.app/api/user/admin/register",
          {
            login_name: loginName,
            password,
            first_name: firstName,
            last_name: lastName,
            location,
            description,
            occupation,
          }
        );
        localStorage.setItem("token", res.data.token);
        navigate(`/users/${res.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="login-container">
      <h3>{isLogin ? "Please Login" : "Register New User"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginRegister;
