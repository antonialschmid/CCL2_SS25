import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HomeLoggedIn from "./pages/HomeLoggedIn";
import WriteALetter from "./pages/WriteALetter";
import Settings from "./pages/Settings";
import LetterDetail from "./pages/LetterDetail";
import AdminPanel from "./pages/AdminPanel";
import BrowseLetters from "./pages/BrowseLetters";
import SingleLetter from "./pages/SingleLetter";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/write" element={<WriteALetter />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/letters/:id" element={<LetterDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/letters" element={<BrowseLetters />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route path="/letters/:id" element={<SingleLetter />} />
            <Route path="/home-loggedin" element={<HomeLoggedIn />} />
        </Routes>
    );
}

export default App;
