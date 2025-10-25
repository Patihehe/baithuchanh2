import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link
import "./styles.css";
import models from "../../modelData/models";

function UserList() {
  const users = models.userListModel();
  return (
    <div>
      <Typography variant="h6">Users</Typography> {/* Sửa lại tiêu đề cho rõ ràng */}
      <List component="nav">
        {users.map((user) => (
          // Dùng React.Fragment (hoặc <>) để bọc Link và Divider
          <React.Fragment key={user._id}>
            <ListItem
              component={Link} // Biến ListItem thành Link
              to={`/users/${user._id}`} // Đặt đường dẫn
              button // Thêm hiệu ứng khi nhấp
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`} // Hiển thị họ và tên
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;