// src/pages/ErrorPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // uses your main styling!

export default function ErrorPage() {
    return (
        <div className="home error-page">
            <h1>DEAR BODY</h1>

            <main className="error-content">
                <h2>Oops... 🌸</h2>
                <p>
                    Looks like this page doesn’t exist or has drifted away. <br />
                    But your words are safe here.
                </p>
                <Link to="/" className="login-btn">Go back home</Link>
            </main>

        </div>
    );
}