// controllers/userController.js

const userModel = require('../models/userModel');
const { checkPassword, createToken } = require('../services/authentication');

// ✅ REGISTER
exports.register = async (req, res) => {
    const { username, email, password } = req.body; // ✅ username!
    try {
        const userId = await userModel.registerUser({ username, email, password });
        res.status(201).json({ message: "User registered", id: userId });
    } catch (err) {
        console.error("[register]", err);
        res.status(500).json({ error: "Registration failed" });
    }
};

// ✅ LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) return res.status(401).json({ error: "No user found" });

        const match = await checkPassword(password, user.password_hash);
        if (!match) return res.status(401).json({ error: "Incorrect password" });

        const token = createToken(user); // enthält username & is_admin
        res.json({ token });
    } catch (err) {
        console.error("[login]", err);
        res.status(500).json({ error: "Login failed" });
    }
};

// ✅ GET PROFILE
exports.getProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await userModel.getUser(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // HIER: is_admin mit rein
        const { id, username, email, bio, created_at, is_admin } = user;
        res.json({ id, username, email, bio, created_at, is_admin }); // auch zurückschicken
    } catch (err) {
        console.error("[getProfile]", err);
        res.status(500).json({ error: "Could not fetch profile" });
    }
};

// ✅ UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { username, email, bio, password } = req.body;
    try {
        await userModel.updateUser({ id: userId, username, email, bio, password }); // ✅ FIX: KEIN name, sondern username!
        res.json({ message: "Profile updated" });
    } catch (err) {
        console.error("[updateProfile]", err);
        res.status(500).json({ error: "Profile update failed" });
    }
};

// ✅ DELETE OWN ACCOUNT
exports.deleteUser = async (req, res) => {
    const userId = req.user.id;
    try {
        await userModel.deleteUser(userId);
        res.json({ message: "User deleted" });
    } catch (err) {
        console.error("[deleteUser]", err);
        res.status(500).json({ error: "Delete failed" });
    }
};