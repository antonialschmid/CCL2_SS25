import { useEffect, useState } from "react";
export default function Profile() {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:3001/letters/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setLetters(data));
    }, []);

    return (
        <div>
            <h2>My Letters</h2>
            {letters.map((letter, index) => (
                <div key={index}>
                    <h3>{letter.title}</h3>
                    <p>{letter.body_part}</p>
                    <p>{letter.content}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}
