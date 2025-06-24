import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "./1234.css";

export default function AdminPanel() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [letters, setLetters] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // ✅ Alle Daten holen & Admin checken
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const profileRes = await axios.get("/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsAdmin(profileRes.data.is_admin === 1);

            if (profileRes.data.is_admin === 1) {
                const userRes = await axios.get("/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(userRes.data);

                const letterRes = await axios.get("/letters/admin/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLetters(letterRes.data);
            } else {
                alert("Access denied: Not an admin");
                navigate("/");
            }
        } catch (err) {
            alert("Access denied or server error.");
            console.error(err);
            navigate("/");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ✅ User löschen
    const handleDeleteUser = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("User deleted.");
            fetchData();
        } catch (err) {
            alert("Could not delete user.");
            console.error(err);
        }
    };

    // ✅ Letter löschen
    const handleDeleteLetter = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Are you sure you want to delete this letter?")) return;

        try {
            await axios.delete(`/letters/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Letter deleted.");
            fetchData();
        } catch (err) {
            alert("Could not delete letter.");
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="home">
            <header className="header">
                <Link to="/home-loggedin">DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    <li><Link to="/letters">Letters</Link></li>
                    <li><Link to="/write">Write</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {isAdmin && <li><Link to="/admin" className="active">Admin</Link></li>}
                </ul>
            </nav>

            <main className="admin-main">
                <section className="admin-section">
                    <h2>All Users</h2>
                    <div className="admin-grid">
                        {users.map((u) => (
                            <div key={u.id} className="admin-card">
                                <p><b>Username:</b> {u.username}</p>
                                <p><b>Email:</b> {u.email}</p>
                                <p><b>Role:</b> {u.is_admin ? "Admin" : "User"}</p>
                                <p><b>Joined:</b> {new Date(u.created_at).toLocaleDateString()}</p>
                                <button onClick={() => handleDeleteUser(u.id)} className="delete-btn">Delete User</button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="admin-section">
                    <h2>All Letters</h2>
                    <div className="admin-grid">
                        {letters.map((l) => (
                            <div key={l.id} className="admin-card">
                                <p><b>Title:</b> {l.title || "Untitled"}</p>
                                <p><b>By:</b> {l.author_name}</p>
                                <p><b>Date:</b> {new Date(l.created_at).toLocaleDateString()}</p>
                                <p><b>Excerpt:</b> {l.content.substring(0, 100)}...</p>
                                <div>❤️ {l.resonate_count}</div>
                                <button onClick={() => handleDeleteLetter(l.id)} className="delete-btn">Delete Letter</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}