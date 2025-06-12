const db = require('../services/database');
const bcrypt = require('bcrypt');


exports.getUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};


exports.getUser = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
};


exports.updateUser = async (userData) => {
    const { id, name, email, bio, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        'UPDATE users SET name = ?, email = ?, bio = ?, password_hash = ? WHERE id = ?',
        [name, email, bio, hashedPassword, id]
    );
    return true;
};

exports.addUser = async (userData) => {
    const { name, email, password, bio } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash, bio) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, bio || null]
    );
    return result.insertId;
};


exports.registerUser = async (data) => {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );
    return result.insertId;
};


exports.deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
};

