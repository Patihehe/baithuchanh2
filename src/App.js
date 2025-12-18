// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar/index";
import UserList from "./components/UserList/index";
import UserDetail from "./components/UserDetail/index";
import UserPhotos from "./components/UserPhotos/index";
import UserComments from "./components/UserComments/index";
import "./App.css"; // Import CSS chung

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <TopBar /> {/* Ví dụ: <div className="top-bar">Vũ Bá Thi</div> */}
        <div className="main-layout">
          <div className="sidebar">
            <UserList />
          </div>
          <div className="content">
            <Routes>
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/photos/:userId" element={<UserPhotos />} />
              <Route path="/comments/:userId" element={<UserComments />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
