const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Load secret key
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// ✅ Helper to compare password
async function checkPassword(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
        console.error('[checkPassword]', err);
        return false;
    }
}

// ✅ Create JWT token
function createToken(user) {
    return jwt.sign(
        { id: user.id, name: user.name },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
}

// ✅ Middleware to protect routes
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Bearer <token>
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

module.exports = {
    checkPassword,
    createToken,
    authenticateJWT
};
