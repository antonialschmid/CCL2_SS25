const db = require('../services/database').config;
const bcrypt = require('bcrypt');

// Get all users (for admin/debugging — optional)
exports.getUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// Get a user by ID
exports.getUser = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
};

// Get a user by email (used for login)
exports.getUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
};

// Create a new user (for register)
exports.registerUser = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );
    return result.insertId;
};

// Update user profile info and password
exports.updateUser = async ({ id, name, email, bio, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        'UPDATE users SET name = ?, email = ?, bio = ?, password_hash = ? WHERE id = ?',
        [name, email, bio, hashedPassword, id]
    );
    return true;
};

// Delete a user by ID
exports.deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
};
