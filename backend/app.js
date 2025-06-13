require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const letterRoutes = require('./routes/letterRoutes');

// Mount routes
app.use('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/users', userRoutes);
app.use('/letters', letterRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Backend server running at http://localhost:${port}`);
});