// components/AddPhoto/index.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./AddPhoto.css"; // Tạo nếu cần

const AddPhoto = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://hhq8qw-8081.csb.app/api/photo/photos/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/photos/${user._id}`); // Redirect đến photos của user
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="add-photo-container">
      <h3>Add New Photo</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddPhoto;
