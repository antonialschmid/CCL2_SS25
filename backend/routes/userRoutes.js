// routes/userRoutes.js

const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
    deleteUser
} = require("../controllers/userController");

const { authenticateJWT, checkAdmin } = require("../services/authentication");
const userModel = require("../models/userModel");

//  PUBLIC routes
router.post("/register", register);
router.post("/login", login);

//  USER PROTECTED routes (Owner)
router.get("/profile", authenticateJWT, getProfile);
router.put("/profile", authenticateJWT, updateProfile);
router.delete("/delete", authenticateJWT, deleteUser);

//  ADMIN routes (nur Admin darf!)

// ➜ Alle User sehen (Admin Panel)
router.get("/", authenticateJWT, checkAdmin, async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (err) {
        console.error("[getAllUsers]", err);
        res.status(500).json({ error: "Could not fetch users" });
    }
});


router.delete("/:id", authenticateJWT, checkAdmin, async (req, res) => {
    try {
        const targetId = req.params.id;
        await userModel.deleteUser(targetId);
        res.json({ message: `User ${targetId} deleted by admin` });
    } catch (err) {
        console.error("[adminDeleteUser]", err);
        res.status(500).json({ error: "Could not delete user" });
    }
});

module.exports = router;