const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const connection = require('../db')

router.get('/alignement', (req,res) => {
    connection.query('select * from alignement', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }
    })
})

module.exports = router