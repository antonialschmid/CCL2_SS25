require("dotenv").config();
const mysql = require("mysql2");


const config = mysql.createConnection({
    host: 'atp.fhstp.ac.at',
    port: 8007,
    user: 'cc241073',
    password: process.env.DB_PASSWORD,
    database: 'cc241073',
    waitForConnections: true,
    connectionLimit: 10,

});

config.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected to database');
    }
});

module.exports = {config};