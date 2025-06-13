const express = require("express");
const router = express.Router();
const {
    getAllLetters,
    getUserLetters,
    createLetter,
    resonateLetter
} = require("../controllers/letterController");

const { authenticateJWT } = require("../services/authentication"); // renaming for consistency

// Public – anyone can view all letters
router.get("/allLetters", getAllLetters);

// Protected – only logged-in users can do the following
router.get("/me", authenticateJWT, getUserLetters);
router.post("/", authenticateJWT, createLetter);
router.put("/:id/resonate", authenticateJWT, resonateLetter);

module.exports = router;