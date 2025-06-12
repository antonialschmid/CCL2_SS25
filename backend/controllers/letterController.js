const letterModel = require('../models/letterModel');

// 📬 Alle Briefe öffentlich abrufen
exports.getAllLetters = async (req, res) => {
    try {
        const letters = await letterModel.getAllLetters();
        res.json(letters);
    } catch (err) {
        console.error("Fehler beim Abrufen aller Briefe:", err);
        res.status(500).json({ error: "Serverfehler" });
    }
};

// 🙋 Eigene Briefe abrufen (Profil)
exports.getUserLetters = async (req, res) => {
    const userId = req.user.id;
    try {
        const letters = await letterModel.getUserLetters(userId);
        res.json(letters);
    } catch (err) {
        console.error("Fehler beim Laden eigener Briefe:", err);
        res.status(500).json({ error: "Serverfehler" });
    }
};

// ✍️ Brief erstellen (mit Login)
exports.createLetter = async (req, res) => {
    const userId = req.user.id;
    const { title, body_part, content } = req.body;

    try {
        const letterId = await letterModel.createLetter(userId, { title, body_part, content });
        res.status(201).json({ message: "Brief erstellt", id: letterId });
    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        res.status(500).json({ error: "Speichern fehlgeschlagen" });
    }
};