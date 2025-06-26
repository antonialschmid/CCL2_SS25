// models/letterModel.js

const db = require('../services/database');

//  Öffentliche Liste aller Letters (Feed)
exports.getAllLetters = async () => {
    const [rows] = await db.query(`
        SELECT id, title, body_part, content, created_at,
               COALESCE(resonate_count, 0) AS resonate_count
        FROM lettersDearBody
        ORDER BY created_at DESC
    `);
    return rows;
};

//  Einzelner Letter (Detail Page)
exports.getLetterById = async (id) => {
    const [rows] = await db.query(`
        SELECT
            id,
            user_id,
            title,
            body_part,
            content,
            created_at,
            COALESCE(resonate_count, 0) AS resonate_count
        FROM lettersDearBody
        WHERE id = ?
    `, [id]);
    return rows[0] || null;
};

//  Liste eigener Letters (nur für eingeloggten User)
exports.getUserLetters = async (userId) => {
    const [rows] = await db.query(`
        SELECT
            id,
            title,
            body_part,
            content,
            created_at,
            COALESCE(resonate_count, 0) AS resonate_count
        FROM lettersDearBody
        WHERE user_id = ?
        ORDER BY created_at DESC
    `, [userId]);
    return rows;
};

//  Neues Letter speichern
exports.createLetter = async (userId, { title, body_part, content }) => {
    const [result] = await db.query(`
        INSERT INTO lettersDearBody
            (user_id, title, body_part, content, created_at, resonate_count)
        VALUES (?, ?, ?, ?, NOW(), 0)
    `, [userId, title, body_part, content]);
    return result.insertId;
};

//  Resonanz hochzählen (Herz-Button)
exports.incrementResonate = async (id) => {
    const [result] = await db.query(`
        UPDATE lettersDearBody
        SET resonate_count = COALESCE(resonate_count, 0) + 1
        WHERE id = ?
    `, [id]);
    return result.affectedRows > 0;
};

//  ADMIN: Alle Letters inkl. User Info (Admin Panel)
exports.getAllLettersAdmin = async () => {
    const [rows] = await db.query(`
        SELECT
            l.*,
            COALESCE(l.resonate_count, 0) AS resonate_count,
            u.username AS author_name
        FROM lettersDearBody l
                 JOIN usersDearBody u ON l.user_id = u.id
        ORDER BY l.created_at DESC
    `);
    return rows;
};

exports.deleteLetter = async (id) => {
    const [result] = await db.query(
        `DELETE FROM lettersDearBody WHERE id = ?`,
        [id]
    );
    return result;
};