const mysql = require('mysql2/promise')
const connection = mysql.createConnection({
    host:process.env.MY_HOST,
    user: process.env.MY_USER,
    password: process.env.PASSWORD,
    database: process.env.DB,     
})

module.exports = connection;