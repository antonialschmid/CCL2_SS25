const express = require("express");
const router = express.Router();
const {
    getAllLetters,
    getUserLetters,
    createLetter,
} = require("../controllers/letterController");

const { verifyToken } = require("../services/authentication");


router.get("/", getAllLetters);

//protected
router.get("/me", verifyToken, getUserLetters);
router.post("/", verifyToken, createLetter);

module.exports = router;