import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';        // ⬅️ new
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />       {/* ⬅️ here */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default App;