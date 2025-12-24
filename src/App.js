// src/App.js
import React from "react";
import AddPhoto from "./components/AddPhoto/index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Thêm
import TopBar from "./components/TopBar/index";
import UserList from "./components/UserList/index";
import UserDetail from "./components/UserDetail/index";
import UserPhotos from "./components/UserPhotos/index";
import UserComments from "./components/UserComments/index";
import LoginRegister from "./components/LoginRegister/index"; // Sẽ tạo
import PhotoDetail from "./components/PhotoDetail/index";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <TopBar />
          <div className="main-layout">
            <div className="sidebar">
              <UserList />
            </div>
            <div className="content">
              <Routes>
                <Route path="/login" element={<LoginRegister />} />
                <Route
                  path="/users/:userId"
                  element={
                    <PrivateRoute>
                      <UserDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <PrivateRoute>
                      <UserPhotos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/comments/:userId"
                  element={
                    <PrivateRoute>
                      <UserComments />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add-photo"
                  element={
                    <PrivateRoute>
                      <AddPhoto />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/photo/:photoId"
                  element={
                    <PrivateRoute>
                      <PhotoDetail />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
