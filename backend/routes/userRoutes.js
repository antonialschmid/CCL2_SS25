const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile,
    deleteUser
} = require("../controllers/userController");

const { authenticateJWT } = require("../services/authentication");

// Public routes
// Home page
router.get('/', (req, res) => {
    res.render('Home', {title: 'Dear Body'});
});

router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authenticateJWT, getProfile);
router.put("/profile", authenticateJWT, updateProfile);
router.delete("/delete", authenticateJWT, deleteUser);

module.exports = router;