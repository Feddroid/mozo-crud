const mysql = require('mysql')

const bd = mysql.createPool({
    host:   "us-cdbr-east-05.cleardb.net",
    user:   "baa92e797b27f1",
    password:   "2f543569",
    database:   "heroku_d50c063c3105f1d"
})

module.exports = bd