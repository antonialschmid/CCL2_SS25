const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userId = await userModel.registerUser({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', id: userId });
    } catch (err) {
        console.error('[register]', err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};

//Log in and return JWT token
const { checkPassword, createToken } = require('../services/authentication');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'No user found' });

        const match = await checkPassword(password, user.password_hash);
        if (!match) return res.status(401).json({ error: 'Incorrect password' });

        const token = createToken(user);
        res.json({ token }); // ⬅️ Frontend saves this in localStorage
    } catch (err) {
        console.error('[login]', err.message);
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get current user's profile
exports.getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.getUser(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Return only selected fields
        const { id, name, email, bio, created_at } = user;
        res.json({ id, name, email, bio, created_at });
    } catch (err) {
        console.error('[getProfile]', err.message);
        res.status(500).json({ error: 'Could not fetch profile' });
    }
};

//Update current user's profile
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, bio, password } = req.body;

    try {
        await userModel.updateUser({ id: userId, name, email, bio, password });
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('[updateProfile]', err.message);
        res.status(500).json({ error: 'Profile update failed' });
    }
};

//Delete current user's account
exports.deleteUser = async (req, res) => {
    const userId = req.user.id;

    try {
        await userModel.deleteUser(userId);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error('[deleteUser]', err.message);
        res.status(500).json({ error: 'Delete failed' });
    }
};