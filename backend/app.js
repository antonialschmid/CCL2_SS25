const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ENV
require('dotenv').config();

// Database
const db = require('./services/database');

// Routes
const userRoutes = require('./routes/userRoutes');
const letterRoutes = require('./routes/letterRoutes');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', userRoutes);
app.use('/users', userRoutes);
app.use('/letters', letterRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'something went wrong', details: err.message });
});

// Server starten
app.listen(port, () => {
    console.log(`✅ Server on http://localhost:${port}`);
});

// static files
app.use(express.static(path.join(__dirname, "public")));

// Catch-all
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});