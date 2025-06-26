// app.js

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3001;

//  Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
const userRoutes = require('./routes/userRoutes');
const letterRoutes = require('./routes/letterRoutes');

app.use('/api/users', userRoutes);
app.use('/api/letters', letterRoutes);

//  Health check
app.get('/', (req, res) => {
    res.send('🎉 Dear Body API is running!');
});

//  Global error handler
app.use((err, req, res, next) => {
    console.error('[Global Error]', err);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
});

//  Start server
app.listen(port, () => {
    console.log(`✅ Backend server running at http://localhost:${port}`);
});