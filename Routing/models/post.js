const mysql = require('mysql');
require('dotenv').config()

// конфигурация
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATA_BASE
});

// connection.connect(err => {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('Database ---- OK');
//    }
// });

// let query = `
//     CREATE TABLE posts (
//     id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//     text VARCHAR(255) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     author VARCHAR(50) NOT NULL,
//     reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     );`;

// connection.query(query, (err, res, field) => {
//     console.log(err);
//     console.log(res);
//     // console.log(field);
// });

// connection.end(err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Database ---- Close');
//     }
// });

module.exports = connection;