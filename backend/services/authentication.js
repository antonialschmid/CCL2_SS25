// services/authentication.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 🔑 Lade dein Secret aus .env
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// ✅ Passwortvergleich (Bcrypt)
async function checkPassword(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
        console.error('[checkPassword]', err);
        return false;
    }
}

// ✅ JWT erstellen: speichere is_admin mit rein!
function createToken(user) {
    return jwt.sign(
        {
            id: user.id,
            name: user.username,
            is_admin: user.is_admin // <-- Admin-Flag kommt mit rein!
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
}

// ✅ JWT prüfen & Payload an req.user hängen
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Format: Bearer <token>
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// ✅ Extra: Nur Admin darf weiter
function checkAdmin(req, res, next) {
    if (!req.user?.is_admin) {
        return res.status(403).json({ error: 'Forbidden: Admins only' });
    }
    next();
}

// ✅ Exportiere alles
module.exports = {
    checkPassword,
    createToken,
    authenticateJWT,
    checkAdmin
};
