import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";

const UserPhotos = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComments, setNewComments] = useState({}); // State cho input comment mỗi photo
  const [userInfo, setUserInfo] = useState(null);
  const { triggerUserListRefresh } = useContext(AuthContext);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchModel(`/api/photo/photosOfUser/${userId}`);
        const user_if = await fetchModel(`/api/user/${userId}`);
        setPhotos(data);
        setUserInfo(user_if);
        const initComments = {};
        data.forEach((photo) => (initComments[photo._id] = ""));
        setNewComments(initComments);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [userId]);

  const handleCommentChange = (photoId, value) => {
    setNewComments((prev) => ({ ...prev, [photoId]: value }));
  };

  const addComment = async (photoId) => {
    const comment = newComments[photoId].trim();
    if (!comment) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://hhq8qw-8081.csb.app/api/photo/commentsOfPhoto/${photoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      const newComment = await response.json();

      setPhotos((prev) =>
        prev.map((photo) =>
          photo._id === photoId
            ? { ...photo, comments: [...photo.comments, newComment] }
            : photo
        )
      );
      triggerUserListRefresh();
      setNewComments((prev) => ({ ...prev, [photoId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading photos: {error.message}</div>;

  return (
    <div className="photos-container">
      <h3>
        Photos of {userInfo.first_name} {userInfo.last_name}
      </h3>
      {photos.map((photo) => (
        <div key={photo._id} id={`photo-${photo._id}`} className="photo-item">
          <img
            src={`https://hhq8qw-8081.csb.app/images/${photo.file_name}`}
            alt={photo.file_name}
            className="photo-img"
          />
          <p className="photo-date">Date: {photo.date_time}</p>
          <h4>Comments:</h4>
          <ul className="comments-list">
            {photo.comments.map((comment) => (
              <li key={comment._id} className="comment">
                <p>"{comment.comment}"</p>
                <span>
                  By:{" "}
                  <Link to={`/users/${comment.user._id}`}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                </span>
                <p>Date: {comment.date_time}</p>
              </li>
            ))}
          </ul>
          {user && ( // Chỉ hiển thị form nếu logged in
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComments[photo._id]}
                onChange={(e) => handleCommentChange(photo._id, e.target.value)}
              />
              <button onClick={() => addComment(photo._id)}>Add Comment</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPhotos;
