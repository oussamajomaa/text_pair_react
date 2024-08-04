const mysql = require('mysql2')
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  connection.connect(err=>{
    if(!err){
        console.log('connection to database ok');
    }else {
        console.log('connection to dtabase failed', err);
    }
})

const { Client } = require('pg');

// Configuration de la connexion
// const connection = new Client({
//   user: 'una',
//   host: 'localhost',
//   database: 'modern',
//   password: 'una',
//   port: 5432,
// });
// connection.connect(err => {
//   if (!err) {
//     console.log('connection to database ok');
//   } else {
//     console.log('connection to dtabase failed', err);
//   }
// })
module.exports = connection;
// module.exports = connection;

