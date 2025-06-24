const express = require("express");
const router = express.Router();

const {
    getAllLetters,
    getLetterById,
    createLetter,
    getUserLetters,
    incrementResonate, // ✅ richtige Funktion
    getAllLettersAdmin,
    deleteLetter    // ✅ korrekt importiert
} = require("../controllers/letterController");

const { authenticateJWT, checkAdmin } = require("../services/authentication");

// Reihenfolge: erst spezifischere, dann generelle!
router.get("/", getAllLetters);
router.get("/me", authenticateJWT, getUserLetters);
router.get("/admin/all", authenticateJWT, checkAdmin, getAllLettersAdmin);
router.get("/:id", getLetterById);

router.post("/", authenticateJWT, createLetter);
router.put("/:id/resonate", authenticateJWT, incrementResonate);
router.delete("/:id", authenticateJWT, checkAdmin, deleteLetter); // ✅ jetzt korrekt

module.exports = router;