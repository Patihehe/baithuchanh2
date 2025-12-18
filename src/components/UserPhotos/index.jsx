// components/UserPhotos/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchModel } from '../../lib/fetchModelData';
import './styles.css'; // Nếu đã tách CSS

const UserPhotos = () => {
  const { userId } = useParams(); // Sửa từ 'id' thành 'userId'
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchModel(`/api/photo/photosOfUser/${userId}`); // Sử dụng userId
        setPhotos(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [userId]); // Dependency là userId

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading photos: {error.message}</div>;
  }

  return (
    <div className="photos-container">
      <h3>Photos of User</h3>
      {photos.map((photo) => (
        <div key={photo._id} id={`photo-${photo._id}`} className="photo-item">
          <img src={`/images/${photo.file_name}`} alt={photo.file_name} className="photo-img" />
          <p className="photo-date">Date: {photo.date_time}</p>
          <h4>Comments:</h4>
          <ul className="comments-list">
            {photo.comments.map((comment) => (
              <li key={comment._id} className="comment">
                <p>"{comment.comment}"</p>
                <p>By: {comment.user.first_name} {comment.user.last_name}</p>
                <p>Date: {comment.date_time}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserPhotos;