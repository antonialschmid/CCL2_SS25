import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css";
import flowerImage from "../assets/flower.png";

export default function LetterDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [letter, setLetter] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // NEU: cleverer Check
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const fetchLetter = async () => {
            try {
                const res = await axios.get(`/letters/${id}`);
                setLetter(res.data);
            } catch (err) {
                console.error("[LetterDetail] Error:", err);
            }
        };

        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const res = await axios.get("/users/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsAdmin(res.data.is_admin === 1);
                }
            } catch (err) {
                console.error("[CheckAdmin] Error:", err);
            }
        };

        fetchLetter();
        checkAdmin();
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleResonate = async () => {
        try {
            await axios.put(`/letters/${id}/resonate`);
            setLetter({ ...letter, resonate_count: letter.resonate_count + 1 });
        } catch (err) {
            console.error("[Resonate Error]", err);
        }
    };

    if (!letter) {
        return (
            <div className="home">
                <h1>DEAR BODY</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="home">
            {/* ✅ Logo abhängig von Login */}
            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    {isLoggedIn && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
                    <li><Link to="/letters">Letters</Link></li>
                    {isLoggedIn && <li><Link to="/write">Write</Link></li>}
                    {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
                    {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                </ul>
            </nav>

            <main className="main">
                <section className="intro letter-detail-page">
                    <span className="back" onClick={() => navigate(-1)}>&lt; Back</span>

                    <div className="letter-detail-box">
                        <h2>{letter.title || "Untitled"}</h2>
                        <span className="date">{new Date(letter.created_at).toLocaleDateString()}</span>
                        <pre className="letter-text">{letter.content}</pre>

                        <button onClick={handleResonate} className="login-btn resonate-btn">
                            ❤{letter.resonate_count}
                        </button>
                    </div>
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                </aside>
            </main>
        </div>
    );
}