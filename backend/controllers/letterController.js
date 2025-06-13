const letterModel = require('../models/letterModel');


exports.getAllLetters = async (req, res) => {
    try {
        const letters = await letterModel.getAllLetters();
        res.json(letters);
    } catch (err) {
        console.error("error loading all letters:", err);
        res.status(500).json({ error: "server failed" });
    }
};


exports.getUserLetters = async (req, res) => {
    const userId = req.user.id;
    try {
        const letters = await letterModel.getUserLetters(userId);
        res.json(letters);
    } catch (err) {
        console.error("Error loading own letter:", err);
        res.status(500).json({ error: "Server failed" });
    }
};


exports.createLetter = async (req, res) => {
    const userId = req.user.id;
    const { title, body_part, content } = req.body;

    try {
        const letterId = await letterModel.createLetter(userId, { title, body_part, content });
        res.status(201).json({ message: "Letter was created", id: letterId });
    } catch (err) {
        console.error("dint work:", err);
        res.status(500).json({ error: "didnt work girly" });
    }
};

exports.resonateLetter = async (req, res) => {
    const letterId = req.params.id;
    try {
        const success = await letterModel.incrementResonate(letterId);
        if (success) {
            res.status(200).json({ message: "Letter resonated successfully." });
        } else {
            res.status(404).json({ error: "Letter not found." });
        }
    } catch (err) {
        console.error("[resonateLetter]", err.message);
        res.status(500).json({ error: "Could not resonate letter." });
    }
};