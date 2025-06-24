import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./1234.css";
import flowerImage from "../assets/flower.png";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ NEU
    const navigate = useNavigate();

    // ✅ Direkt prüfen ob Token vorhanden
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            await axios.post("/users/register", { username, email, password });
            alert("Registered successfully!");
            navigate("/login");
        } catch (err) {
            console.error("[Register Error]", err);
            alert("Something went wrong: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="home">
            {/* ✅ Logo smart */}
            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    <li><Link to="/login" className="active">Login</Link></li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/letters">Letters</Link></li>
                </ul>
            </nav>
            <main className="main">
                <section className="intro">
                    <form onSubmit={handleRegister} className="login-form">
                        <h3>Register</h3>

                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

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

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <p className="register-hint">
                            Already have an account? <Link to="/login"><em>Login here</em></Link>
                        </p>

                        <div className="button-wrap">
                            <button type="submit" className="login-btn">Register</button>
                        </div>
                    </form>
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                </aside>
            </main>
        </div>
    );
}