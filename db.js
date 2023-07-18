const mysql = require('mysql2');
/*
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '201088Yo',
    port: '3306',
    database: 'HastaTakip'
});
*/


    var  pool = mysql.createPool({
        host: '10.0.31.220',
        user: 'root',
        password: '201088Yo',
        port: '3306',
        database: 'HastaMuayene'
    });
    

    pool.getConnection((err,connection)=> {
        if(err)
        throw err;
        console.log('Database connected successfully');
        connection.release();
      });




module.exports = pool;

