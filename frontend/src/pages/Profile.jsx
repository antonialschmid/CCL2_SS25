import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css";

export default function Profile() {
    const navigate = useNavigate();
    const [letters, setLetters] = useState([]);
    const [profile, setProfile] = useState(null);

    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const lettersRes = await axios.get("/letters/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profileRes = await axios.get("/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setLetters(lettersRes.data);

                setProfile({
                    name: profileRes.data.username,
                    email: profileRes.data.email,
                    bio: profileRes.data.bio || "No bio yet",
                    joined: new Date(profileRes.data.created_at).toLocaleDateString(),
                    letterCount: lettersRes.data.length,
                    isAdmin: profileRes.data.is_admin === 1
                });

            } catch (err) {
                console.error("[Profile Fetch Error]", err);
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div className="home">
            {/* Logo führt smart */}
            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    <li><Link to="/letters">Letters</Link></li>
                    <li><Link to="/write">Write</Link></li>
                    <li><Link to="/profile" className="active">Profile</Link></li>
                    {profile?.isAdmin && (
                        <li><Link to="/admin">Admin</Link></li>
                    )}
                </ul>
            </nav>

            <main className="main">
                <section className="intro">
                    {letters.length === 0 ? (
                        <p>
                            You haven’t written any letters yet.<br />
                            <Link to="/write" className="inline-link">Start your journey here</Link>
                        </p>
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
                                <p>{letter.content.slice(0, 100)}...</p>
                                <div className="resonate">❤ {letter.resonate_count}</div>
                            </Link>
                        ))
                    )}
                </section>

                <aside className="side-profile">
                    {profile && (
                        <div className="profile-box">
                            <p><em>hello,</em><br /><strong>{profile.name}</strong></p>
                            <p><em>e-mail,</em><br /><strong>{profile.email}</strong></p>
                            <p><em>about you,</em><br /><strong>{profile.bio}</strong></p>
                            <p><em>part of this space since,</em><br /><strong>{profile.joined}</strong></p>
                            <p><em>letters written,</em><br /><strong>{profile.letterCount}</strong></p>
                            <div className="edit-button-wrap">
                                <Link to="/settings" className="edit-btn">Edit</Link>
                            </div>
                        </div>
                    )}
                </aside>
            </main>
        </div>
    );
}