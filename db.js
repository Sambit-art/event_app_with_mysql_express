const mysql = require('promise-mysql')

const dbCon = async () => {
    return await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sambit",
        database: "event_manager",
    })
}
module.exports = dbCon;
