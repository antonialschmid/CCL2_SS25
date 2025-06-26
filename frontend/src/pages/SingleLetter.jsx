import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css";
import flowerImage from "../assets/flower.png";

export default function SingleLetter() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [letter, setLetter] = useState(null);
    const [error, setError] = useState(null);
    const [resonates, setResonates] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/letters/${id}`);
                setLetter(res.data);
                setResonates(res.data.resonate_count || 0);
            } catch (err) {
                console.error("[SingleLetter] Fetch error:", err);
                setError("Letter not found.");
            }

            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
                try {
                    const res = await axios.get("/users/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setIsAdmin(res.data.is_admin === 1);
                } catch (err) {
                    console.error("[SingleLetter] Profile fetch error:", err);
                }
            }
        };

        fetchData();
    }, [id]);

    const handleResonate = async () => {
        try {
            await axios.put(`/letters/${id}/resonate`);
            setResonates(resonates + 1);
        } catch (err) {
            console.error("[Resonate] Error:", err);
            alert("Failed to resonate.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (error) {
        return (
            <div className="home">
                <header className="header">
                    <Link to="/">DEAR BODY</Link>
                </header>
                <p>{error}</p>
                <Link to="/letters">Back to all letters</Link>
            </div>
        );
    }

    if (!letter) {
        return (
            <div className="home">
                <header className="header">
                    <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
                </header>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="home">

            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    {isLoggedIn && (
                        <>
                            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                            <li><Link to="/letters">Letters</Link></li>
                            <li><Link to="/write">Write</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            {isAdmin && <li><Link to="/admin">Admin</Link></li>}
                        </>
                    )}
                    {!isLoggedIn && (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/letters">Letters</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </nav>

            <main className="columns">
                <section className="intro">
                    <h2>{letter.title || "Untitled"}</h2>
                    <p><em>Body Part:</em> {letter.body_part || "-"}</p>
                    <p>{letter.content}</p>
                    <p><em>Written on:</em> {new Date(letter.created_at).toLocaleDateString()}</p>

                    {isLoggedIn && (
                        <button onClick={handleResonate} className="resonate-btn">
                            ❤  ({resonates})
                        </button>
                    )}
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                </aside>
            </main>
        </div>
    );
}