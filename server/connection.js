const mysql = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "process.env.hostname",
    database: "process.env.database",
    password: "process.env.password",
    port: "process.env.PORT",
    user: "process.env.username",
    
    
    
    

})

module.exports.pool = pool;