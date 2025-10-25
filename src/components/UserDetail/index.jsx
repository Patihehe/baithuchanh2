import React from "react";
import { Typography, Paper, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom"; // Import Link và useParams
import "./styles.css";
import models from "../../modelData/models"; // Import models

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams(); // Lấy userId từ URL
  const user = models.userModel(userId); // Lấy thông tin user

  if (!user) {
    return <Typography>User not found!</Typography>;
  }

  return (
    <Paper style={{ padding: "16px" }}>
      {/* Hiển thị tên */}
      <Typography variant="h4">
        {`${user.first_name} ${user.last_name}`}
      </Typography>

      {/* Hiển thị các thông tin chi tiết */}
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        <strong>Description:</strong> {user.description}
      </Typography>

      {/* Nút bấm để xem ảnh */}
      <Button
        variant="contained"
        color="primary"
        component={Link} // Biến Button thành Link
        to={`/photos/${user._id}`} // Đặt đường dẫn đến trang ảnh
        style={{ marginTop: "20px" }}
      >
        View Photos
      </Button>
    </Paper>
  );
}

export default UserDetail;