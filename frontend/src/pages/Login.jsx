// src/pages/Login.js
import React, { useState } from 'react';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/profile'); // später
        } catch (err) {
            alert('Login failed: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login;