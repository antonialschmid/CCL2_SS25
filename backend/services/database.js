//MySQL + .env laden
const mysql = require("mysql2/promise");
require("dotenv").config();

//Connection
const config = mysql.createConnection({
    host: 'atp.fhstp.ac.at',
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'cc241073'

});

config.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connected to database');
    }
});

//exporting the connection configuration
module.exports = {config};
