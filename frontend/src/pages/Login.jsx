import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css"; // dein einheitliches CSS
import flowerImage from "../assets/flower.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ✅ HINZUFÜGEN:
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/profile");
        } catch (err) {
            console.error("[Login Error]", err);
            alert("Login failed: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="home">
            {/* Logo */}
            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedIn" : "/"}>DEAR BODY</Link>
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
                    <form onSubmit={handleLogin} className="login-form">
                        <h3>Login</h3>
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
                        <p className="register-hint">
                            no account? <Link to="/register">register here</Link>
                        </p>
                        <div className="button-wrap">
                            <button type="submit" className="login-btn">Login</button>
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