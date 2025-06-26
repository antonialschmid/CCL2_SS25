import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css";
import flowerImage from "../assets/flower.png";

export default function BrowseLetters() {
    const [letters, setLetters] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // ✅ NEU
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                const res = await axios.get("/letters");
                setLetters(res.data);
            } catch (err) {
                console.error("[BrowseLetters] Error:", err);
            }
        };

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await axios.get("/users/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsAdmin(res.data.is_admin === 1);
                }
            } catch (err) {
                console.error("[BrowseLetters] Profile Error:", err);
            }
        };

        fetchLetters();
        if (isLoggedIn) fetchProfile();
    }, [isLoggedIn]);

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
                    {isLoggedIn ? (
                        <>
                            <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
                            <li><Link to="/letters" className="active">Letters</Link></li>
                            <li><Link to="/write">Write</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            {isAdmin && (
                                <li><Link to="/admin">Admin</Link></li>
                            )}
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/letters" className="active">Letters</Link></li>
                        </>
                    )}
                </ul>
            </nav>

            <main className="main">
                <section className="intro">
                    {letters.length === 0 ? (
                        <p>No letters found yet. {isLoggedIn && <Link to="/write">Write your first letter</Link>}!</p>
                    ) : (
                        letters.map((letter) => (
                            <Link
                                to={`/letters/${letter.id}`}
                                key={letter.id}
                                className="letter-card"
                            >
                                <h3>
                                    {letter.title || "(No Title)"}{" "}
                                    <span className="date">
                                        {new Date(letter.created_at).toLocaleDateString()}
                                    </span>
                                </h3>
                                <p>{letter.content.slice(0, 120)}...</p>
                                <div className="resonate">❤ {letter.resonate_count || 0}</div>
                            </Link>
                        ))
                    )}
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                </aside>
            </main>
        </div>
    );
}