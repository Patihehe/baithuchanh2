// components/PhotoDetail/index.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import { AuthContext } from "../../context/AuthContext";
import "./PhotoDetail.css";

const PhotoDetail = () => {
  const { photoId } = useParams(); // Lấy photoId từ URL
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(""); // Input cho add comment

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchModel(`/api/photo/photo/${photoId}`); // Gọi API mới
        setPhoto(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadPhoto();
  }, [photoId]);

  const addComment = async () => {
    const comment = newComment.trim();
    if (!comment) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://ypvdmq-8081.csb.app/api/photo/commentsOfPhoto/${photoId}`,
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

      const newCom = await response.json();
      setPhoto((prev) => ({ ...prev, comments: [...prev.comments, newCom] }));
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading photo: {error.message}</div>;
  if (!photo) return <div>Photo not found</div>;

  return (
    <div className="photo-detail-container">
      <h3>Photo Detail</h3>
      <img
        src={`https://ypvdmq-8081.csb.app/images/${photo.file_name}`}
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
      {user && (
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;
