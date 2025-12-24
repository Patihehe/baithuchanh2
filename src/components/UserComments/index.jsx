// components/UserComments/index.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";
import "./styles.css";

const UserComments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const commentsData = await fetchModel(
          `/api/user/commentsOfUser/${userId}`
        );
        setComments(commentsData);
        const userData = await fetchModel(`/api/user/${userId}`);
        setUserName(`${userData.first_name} ${userData.last_name}`);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading comments: {error.message}</div>;

  return (
    <div className="comments-container">
      <h3>Comments by {userName}</h3>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-item">
          <img
            src={`https://ypvdmq-8081.csb.app/images/${comment.file_name}`}
            alt="Thumbnail"
            className="thumbnail"
          />
          <div className="comment-content">
            <p className="comment-text">"{comment.comment_text}"</p>
            <p className="comment-meta">
              On photo:{" "}
              <Link to={`/photo/${comment.photo_id}`} className="view-link">
                View Photo
              </Link>
            </p>
            <p className="comment-date">{comment.date_time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserComments;
