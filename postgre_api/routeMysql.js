const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'osm',
    password: 'osm',
    database: 'ModERN'
});

mysqlConnection.connect(err => {
    if (!err) {
        console.log('connection to database mysql ok');
    } else {
        console.log('connection to dtabase mysql failed', err);
    }
})

router.post('/alignment', (req, res) => {
    const alignment = req.body
    console.log('alignment ',alignment);
    
    mysqlConnection.query('INSERT INTO alignment SET ?', alignment, (err, row) => {
        if (!err) {
            res.status(200).send({ message: `Alignment a été ajouté` })
        }
    })
})

router.get('/truncate',(req,res)=>{
    mysqlConnection.query('TRUNCATE TABLE alignment',(err,row)=> {
        if (!err) {
            res.json({message:"Table truncated"})
        }
    })
})

module.exports = router