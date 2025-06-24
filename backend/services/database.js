// services/database.js

require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'atp.fhstp.ac.at',
    port: 8007,
    user: 'cc241073',
    password: process.env.DB_PASSWORD,
    database: 'cc241073',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportiere direkt die Promise-Version:
module.exports = pool.promise();