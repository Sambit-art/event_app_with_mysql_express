const mysql = require('promise-mysql')

const dbCon = async () => {
    return await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
}
module.exports = dbCon;
