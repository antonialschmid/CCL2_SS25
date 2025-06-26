import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./styles.css";
import flowerImage from "../assets/flower.png";

export default function Settings() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const isLoggedIn = !!localStorage.getItem("token");

    // Lade aktuelle User-Daten
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsername(res.data.username);
                setEmail(res.data.email);
                setBio(res.data.bio || "");
                setIsAdmin(res.data.is_admin === 1);
            } catch (err) {
                console.error("[Settings Fetch Error]", err);
                navigate("/login");
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "/users/profile",
                {
                    username,
                    email,
                    bio,
                    password: newPassword || undefined,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Profile updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
            navigate("/profile");
        } catch (err) {
            console.error("[Profile Update Error]", err);
            alert("Update failed: " + (err.response?.data?.error || err.message));
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This cannot be undone!"
        );
        if (confirmDelete) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete("/users/delete", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Account deleted.");
                localStorage.removeItem("token");
                navigate("/");
            } catch (err) {
                console.error("[Delete Error]", err);
                alert("Delete failed: " + (err.response?.data?.error || err.message));
            }
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
                    <li><Link to="/write">Write</Link></li>
                    <li><Link to="/profile" className="active">Profile</Link></li>
                    {isAdmin && (
                        <li><Link to="/admin">Admin</Link></li>
                    )}
                </ul>
            </nav>

            <main className="main">
                <section className="intro">
                    <form onSubmit={handleUpdate} className="login-form">

                        <label>
                            <em>hello,</em><br />
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </label>

                        <label>
                            <em>e-mail,</em><br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </label>

                        <label>
                            <em>about you,</em><br />
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Bio"
                            />
                        </label>

                        <label>
                            <em>new password</em><br />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>

                        <label>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>

                        <button type="submit" className="save-btn">Save Changes</button>
                        <button type="button" className="delete-btn" onClick={handleDelete}>Delete Account</button>
                    </form>
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                </aside>
            </main>
        </div>
    );
}