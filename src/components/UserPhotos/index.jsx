import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom"; // Import Link và useParams
import "./styles.css";
import models from "../../modelData/models"; // Import models

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams(); // Lấy userId
  const photos = models.photoOfUserModel(userId); // Lấy danh sách ảnh

  // Hàm trợ giúp để định dạng ngày giờ
  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString();
  };

  return (
    <div>
      {/* Lặp qua từng ảnh */}
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "20px" }}>
          {/* Hiển thị ảnh */}
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`} // Đường dẫn đến ảnh (đã di chuyển vào public)
            alt="user photo"
          />
          <CardContent>
            {/* Hiển thị ngày đăng ảnh */}
            <Typography variant="caption" display="block">
              Posted: {formatDateTime(photo.date_time)}
            </Typography>

            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Comments
            </Typography>
            {/* Hiển thị danh sách bình luận */}
            <List>
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <React.Fragment key={comment._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        // Nội dung bình luận
                        primary={comment.comment}
                        // Tên người bình luận (là Link) và ngày bình luận
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              —{" "}
                              <Link to={`/users/${comment.user._id}`}>
                                {`${comment.user.first_name} ${comment.user.last_name}`}
                              </Link>
                            </Typography>
                            {` (${formatDateTime(comment.date_time)})`}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              ) : (
                <Typography variant="body2">No comments yet.</Typography>
              )}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;