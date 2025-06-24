import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./1234.css";
import flowerImage from "../assets/flower.png";

export default function HomeLoggedIn() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    // Hole Profil, um Admin-Status zu prüfen
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsAdmin(res.data.is_admin === 1); // MySQL liefert meist 1 oder 0
            } catch (err) {
                console.error("[HomeLoggedIn] Admin-Check failed:", err);
            }
        };
        checkAdmin();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="home">
            {/* Logo */}
            <header className="header">
                <Link to="/home-loggedin">DEAR BODY</Link>
            </header>

            {/* Nav mit Admin Panel Link */}
            <nav>
                <ul>
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    <li><Link to="/letters">Letters</Link></li>
                    <li><Link to="/write">Write</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {isAdmin && (
                        <li><Link to="/admin">Admin</Link></li>
                    )}
                </ul>
            </nav>

            <main className="main">
                <section className="intro">
                    <p>
                        Your body holds stories of softness and survival, of changes, tensions, tenderness.<br />
                        Sometimes, we carry things we never said.<br />
                        Dear Body is a space to finally say them.<br />
                    </p>
                    <p>
                        Write a letter to your body or a part of it, not to fix it, not to judge it, but simply to
                        speak.<br />
                        To reclaim language. To reconnect.<br />
                        Here, you are not alone in what you’ve felt, feared, or loved.
                    </p>
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                    <div className="button-wrap">
                        <Link to="/write" className="login-btn">Write</Link>
                    </div>
                </aside>
            </main>
        </div>
    );
}