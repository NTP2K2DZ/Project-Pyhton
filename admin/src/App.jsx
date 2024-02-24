import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import SidebarProvider from './contexts/SidebarContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Cập nhật trạng thái isLoggedIn thành false khi đăng xuất
  };

  return (
    <Router>
      <SidebarProvider>
        <div style={{ display: "flex" }}>
          {isLoggedIn && <Sidebar logout={handleLogout} />} {/* Truyền hàm logout xuống Sidebar */}
          <div style={{ flex: 1 }}>
            <Routes>
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path="/products"
                element={isLoggedIn ? <Products /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;
