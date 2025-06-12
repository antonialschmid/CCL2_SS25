const db = require('../services/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration failed:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

//Login (get Token)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ error: 'No user found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        console.error('Login failed:', err);
        res.status(500).json({ error: 'Login failed' });
    }
};

// show profile
exports.getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.query('SELECT id, name, email, bio FROM users WHERE id = ?', [userId]);
        res.json(rows[0]);
    } catch (err) {
        console.error('Profile fetch failed:', err);
        res.status(500).json({ error: 'Profile fetch failed' });
    }
};

//update user Profile
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, bio } = req.body;

    try {
        await db.query(
            'UPDATE users SET name = ?, bio = ? WHERE id = ?',
            [name, bio, userId]
        );
        res.json({ message: 'Profile updated' });
    } catch (err) {
        console.error('Profile update failed:', err);
        res.status(500).json({ error: 'Update failed' });
    }
};

// delete user
exports.deleteUser = async (req, res) => {
    const userId = req.user.id;

    try {
        await db.query('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error('Delete failed:', err);
        res.status(500).json({ error: 'Delete failed' });
    }
};