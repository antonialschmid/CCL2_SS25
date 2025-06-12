import { Link } from "react-router-dom";
export default function App() {
    return (
        <div>
            <h1>Dear Body</h1>
            <nav>
                <Link to="/read">Read Letters</Link> | {" "}
                <Link to="/write">Write a Letter</Link> | {" "}
                <Link to="/profile">Profile</Link> | {" "}
                <Link to="/login">Login</Link> | {" "}
                <Link to="/register">Register</Link>
            </nav>
        </div>
    );
}
