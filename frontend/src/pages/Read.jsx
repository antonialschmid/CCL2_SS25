import { useEffect, useState } from "react";
export default function Read() {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/letters")
            .then((res) => res.json())
            .then((data) => setLetters(data));
    }, []);

    return (
        <div>
            <h2>Read Letters</h2>
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
