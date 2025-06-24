// controllers/letterController.js

const letterModel = require('../models/letterModel');

// PUBLIC: Alle Letters (für Feed)
exports.getAllLetters = async (req, res) => {
    try {
        const letters = await letterModel.getAllLetters();
        res.json(letters);
    } catch (err) {
        console.error("[getAllLetters]", err);
        res.status(500).json({ error: "Failed to load all letters" });
    }
};

// PUBLIC: Einzelner Letter (Detail Page)
exports.getLetterById = async (req, res) => {
    const id = req.params.id;
    try {
        const letter = await letterModel.getLetterById(id);
        if (!letter) return res.status(404).json({ error: "Letter not found" });
        res.json(letter);
    } catch (err) {
        console.error("[getLetterById]", err);
        res.status(500).json({ error: "Failed to load letter" });
    }
};

// AUTH: Eigene Letters (Profil)
exports.getUserLetters = async (req, res) => {
    try {
        const letters = await letterModel.getUserLetters(req.user.id);
        res.json(letters);
    } catch (err) {
        console.error("[getUserLetters]", err);
        res.status(500).json({ error: "Failed to load your letters" });
    }
};

// AUTH: Neuen Letter erstellen
exports.createLetter = async (req, res) => {
    try {
        const { title, body_part, content } = req.body;
        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "Content must not be empty" });
        }

        const letterId = await letterModel.createLetter(req.user.id, {
            title,
            body_part,
            content
        });

        res.status(201).json({ message: "Letter created", id: letterId });
    } catch (err) {
        console.error("[createLetter ERROR]", err);
        res.status(500).json({ error: "Failed to create letter" });
    }
};

// AUTH: Resonate erhöhen
exports.incrementResonate = async (req, res) => {
    const letterId = req.params.id;
    try {
        const success = await letterModel.incrementResonate(letterId);
        if (success) {
            res.json({ message: "Letter resonated successfully" });
        } else {
            res.status(404).json({ error: "Letter not found" });
        }
    } catch (err) {
        console.error("[resonateLetter]", err);
        res.status(500).json({ error: "Could not resonate letter" });
    }
};

// ADMIN: Alle Letters inkl. User Info (Admin Panel)
exports.getAllLettersAdmin = async (req, res) => {
    try {
        const letters = await letterModel.getAllLettersAdmin();
        res.json(letters);
    } catch (err) {
        console.error("[getAllLettersAdmin]", err);
        res.status(500).json({ error: "Failed to load all letters for admin" });
    }
};

// ADMIN: Letter löschen
exports.deleteLetter = async (req, res) => {
    const id = req.params.id;
    try {
        await letterModel.deleteLetter(id);
        res.json({ message: "Letter deleted." });
    } catch (err) {
        console.error("[deleteLetter]", err);
        res.status(500).json({ error: "Failed to delete letter" });
    }
};