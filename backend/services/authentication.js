//importing the jsonwebtoken module to handle JWT tokens
const jwt = require('jsonwebtoken');
//importing the ACCESS_TOKEN_SECRET from the dot-env file
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
//importing the bcrypt module to handle password hashing
const bcrypt = require('bcrypt');

// Async password checker that has 2 parameters (password - from the user input and hash - from the database) ; the comprassion is done by bcrypt.compare()
async function checkPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        console.error('Error comparing password:', err);
        return false;
    }
}

// the main user authentication function, takes 3 parameters:
// email & password from the login form user input
//users array from the database
//res - the response object the is being sent to the client after the authentication is done

async function authenticateUser({ email, password }, users, res) {
    const user = users.find(u => u.email === email); //finding the user in the database by email
    console.log('🔍 Attempting login for:', email); //logging the attempt in the console

    //if the user is not found, return a 401 status and a message
    if (!user) {
        console.warn('❌ User not found');
        return res.status(401).send('Invalid credentials');
    }

    //if the user is found, logging it in the console & declaring the password from the database that should be compared against the password from the user input
    console.log('✅ User found:', user.email);
    console.log('➡️ Checking hashed password:', user.password);

    //creating a promise that does it using bcrypt.compare() ; returns true if there is a match, false otherwise
    const isMatch = await bcrypt.compare(password, user.password);

    //if the password is not correct, return a 401 status and a message
    if (!isMatch) {
        console.warn('❌ Password does not match');
        return res.status(401).send('Invalid credentials');
    }

    //creating a JWT token for the user (+storing it in the cookies) & redirecting to the user's page according to the user's id
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('accessToken', token);
    res.redirect('/users/' + user.id);
}


// Middleware for protected routes
function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    //if the token is found, verify it using jwt.verify() ; if the token is not found, return a 401 status ; if the token is found, store the user's data in the request object
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.redirect('/login'); // 👈 Redirect instead of 403
            req.user = user;
            next();
        });
        //
    } else {
        res.redirect('/login'); // 👈 Redirect instead of 401
    }
}

module.exports = {
    authenticateUser,
    authenticateJWT
};

