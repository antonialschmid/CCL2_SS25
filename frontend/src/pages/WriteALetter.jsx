import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css";
import flowerImage from "../assets/flower.png";

export default function WriteALetter() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [content, setContent] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ NEU


    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
                try {
                    const res = await axios.get("/users/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsAdmin(res.data.is_admin === 1);
                } catch (err) {
                    console.error("[WriteALetter FetchProfile Error]", err);
                }
            }
        };
        fetchProfile();
    }, []);

    const handleWrite = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "/letters",
                { title, body_part: bodyPart, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Letter saved!");
            navigate("/letters");
        } catch (err) {
            console.error("[WriteALetter] Error:", err);
            alert("Error saving letter: " + (err.response?.data?.error || err.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="home">

            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    <li><Link to="/letters">Letters</Link></li>
                    <li><Link to="/write" className="active">Write</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {isAdmin && (
                        <li><Link to="/admin">Admin</Link></li>
                    )}
                </ul>
            </nav>

            <main className="main">
                {/* LEFT: Big textarea */}
                <section className="intro">
                    <textarea
                        placeholder="dear body..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="big-letter"
                    />
                </section>

                {/* RIGHT: Inputs + Post + Flower */}
                <aside className="side">
                    <input
                        type="text"
                        placeholder="title (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-right"
                    />
                    <input
                        type="text"
                        placeholder="body part"
                        value={bodyPart}
                        onChange={(e) => setBodyPart(e.target.value)}
                        className="input-right"
                    />

                    <div className="button-wrap">
                        <button onClick={handleWrite} className="login-btn">Post</button>
                    </div>

                    <img src={flowerImage} alt="Flower" />
                </aside>
            </main>
        </div>
    );
}