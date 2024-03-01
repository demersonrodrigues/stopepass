const mysql = require('mysql2/promise')

// import mysql from 'mysql2/promise';

require('dotenv').config();

// export default connect = async () => {
//     return mysql.createConnection({
//         host:process.env.MY_HOST,
//         user: process.env.MY_USER,
//         password: process.env.MY_PASSWORD,
//         database: process.env.MY_DB,
//     })
// } 

const connection = mysql.createConnection({
    host:process.env.MY_HOST,
    user: process.env.MY_USER,
    password: process.env.MY_PASSWORD,
    database: process.env.MY_DB,     
})


module.exports = connection;