// models/userModel.js
const db = require('../services/database');
const bcrypt = require('bcrypt');

//  Alle User (Admin Panel)
exports.getUsers = async () => {
    const conn = await db;
    const [rows] = await conn.query(
        'SELECT id, username, email, is_admin, created_at FROM usersDearBody'
    );
    return rows;
};

//  Einzelner User (für Profil)
exports.getUser = async (id) => {
    const conn = await db;
    const [rows] = await conn.query(
        'SELECT id, username, email, bio, is_admin, created_at FROM usersDearBody WHERE id = ?',
        [id]
    );
    return rows[0] || null;
};

//  User nach Email (für Login)
exports.getUserByEmail = async (email) => {
    const conn = await db;
    const [rows] = await conn.query(
        'SELECT * FROM usersDearBody WHERE email = ?',
        [email]
    );
    return rows[0] || null;
};

//  Registrierung — standardmäßig is_admin = false
exports.registerUser = async ({ username, email, password }) => {
    const conn = await db;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await conn.query(
        'INSERT INTO usersDearBody (username, email, password_hash, is_admin) VALUES (?, ?, ?, 0)',
        [username, email, hashedPassword]  // ✅ username OK!
    );
    return result.insertId;
};

//  Profil-Update — Passwort optional!
exports.updateUser = async ({ id, username, email, bio, password }) => {  // ✅ FIX: username!
    const conn = await db;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await conn.query(
            'UPDATE usersDearBody SET username = ?, email = ?, bio = ?, password_hash = ? WHERE id = ?',
            [username, email, bio, hashedPassword, id]
        );
    } else {
        await conn.query(
            'UPDATE usersDearBody SET username = ?, email = ?, bio = ? WHERE id = ?',
            [username, email, bio, id]
        );
    }
    return true;
};

//  User löschen (User oder Admin)
exports.deleteUser = async (id) => {
    const conn = await db;
    await conn.query(
        'DELETE FROM usersDearBody WHERE id = ?',
        [id]
    );
    return true;
};