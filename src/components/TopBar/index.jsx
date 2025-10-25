import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom"; // Import hooks
import "./styles.css";
import models from "../../modelData/models"; // Import models

function TopBar() {
  const location = useLocation(); // Hook để lấy URL hiện tại
  const { userId } = useParams(); // Hook để lấy userId từ URL
  let contextMessage = ""; // Thông điệp ngữ cảnh

  // Kiểm tra nếu có userId trên URL
  if (userId) {
    const user = models.userModel(userId);
    if (user) {
      // Nếu đang ở trang chi tiết
      if (location.pathname.startsWith("/users/")) {
        contextMessage = `${user.first_name} ${user.last_name}`;
      }
      // Nếu đang ở trang ảnh
      else if (location.pathname.startsWith("/photos/")) {
        contextMessage = `Photos of ${user.first_name} ${user.last_name}`;
      }
    }
  }

  return (
    <AppBar className="topbar-appBar" position="static"> {/* Sửa position="absolute" thành "static" */}
      <Toolbar>
        {/* Tên của bạn */}
        <Typography variant="h5" color="inherit" style={{ flexGrow: 1 }}>
        This is the TopBar component
        </Typography>
        {/* Ngữ cảnh */}
        <Typography variant="h6" color="inherit">
          {contextMessage}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;