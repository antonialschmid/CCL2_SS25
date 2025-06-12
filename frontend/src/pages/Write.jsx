import { useState } from "react";
export default function Write() {
    const [title, setTitle] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/letters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, body_part: bodyPart, content }),
        });

        if (res.ok) alert("Letter sent!");
        else alert("Failed to send letter");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Write a Letter</h2>
            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Body Part" onChange={(e) => setBodyPart(e.target.value)} />
            <textarea placeholder="Content" onChange={(e) => setContent(e.target.value)} />
            <button type="submit">Send</button>
        </form>
    );
}