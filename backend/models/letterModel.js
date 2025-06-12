const db = require('../services/database');

// 📨 Alle Briefe (öffentlich)
exports.getAllLetters = async () => {
    const [rows] = await db.query(
        `SELECT id, title, body_part, content, created_at 
     FROM letters 
     ORDER BY created_at DESC`
    );
    return rows;
};

// 🧑 Eigene Briefe (nur eingeloggte User)
exports.getUserLetters = async (userId) => {
    const [rows] = await db.query(
        `SELECT id, title, body_part, content, created_at 
     FROM letters 
     WHERE user_id = ? 
     ORDER BY created_at DESC`,
        [userId]
    );
    return rows;
};

// ✍️ Brief speichern
exports.createLetter = async (userId, { title, body_part, content }) => {
    const [result] = await db.query(
        `INSERT INTO letters (user_id, title, body_part, content, created_at) 
     VALUES (?, ?, ?, ?, NOW())`,
        [userId, title, body_part, content]
    );
    return result.insertId;
};
