import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import flowerImage from "../assets/flower.png";

export default function Home() {
    // Check if logged in
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <div className="home">

            <header className="header">
                <Link to={isLoggedIn ? "/home-loggedin" : "/"}>DEAR BODY</Link>
            </header>

            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/letters">Letters</Link></li>
                </ul>
            </nav>

            <main className="main">
                <section className="intro">
                    <p>
                        Your body holds stories of softness and survival, of changes, tensions, tenderness.<br/>
                        Sometimes, we carry things we never said.<br/>
                        Dear Body is a space to finally say them.<br/>
                    </p>
                    <p>
                        Write a letter to your body or a part of it, not to fix it, not to judge it, but simply to
                        speak.<br/>
                        To reclaim language. To reconnect.<br/>
                        Here, you are not alone in what you’ve felt, feared, or loved.
                    </p>
                </section>

                <aside className="side">
                    <img src={flowerImage} alt="Flower" />
                    <div className="button-wrap">
                        <Link to="/login" className="login-btn">Login</Link>
                    </div>
                </aside>
            </main>
        </div>
    );
}