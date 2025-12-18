import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

const UserDetail = () => {
  const { userId } = useParams(); // Sửa từ 'id' thành 'userId' để khớp route
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchModel(`/api/user/${userId}`); // Sử dụng userId
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [userId]); // Dependency là userId

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h3>
        {user.first_name} {user.last_name}
      </h3>
      <p>Location: {user.location}</p>
      <p>Description: {user.description}</p>
      <p>Occupation: {user.occupation}</p>
    </div>
  );
};

export default UserDetail;
