const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const connection = require('../db')
router.get('/user', (req, res) => {
    res.json({ message: 'heloo' })
})


// REGISTER
router.post('/register', (req, res) => {
    const user = req.body
    console.log(user.role);
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    connection.query("SELECT * FROM user WHERE email = ?", [user.email], (err, results) => {
        console.log(results.length);
        if (results.length > 0) {
            res.status(409).send({ message: 'this email is already exist' })
        } else {
            connection.query('INSERT INTO user SET ?', user, (err, rows) => {
                if (!err) {
                    res.status(200).send({ message: `A user ${user.email} has been addes` })
                }
            })
        }
    })
})

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(email);
    const query = 'SELECT * from user WHERE email = ?'
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error')
        } else {
            if (results.length > 0) {
                let hash = results[0]['password']
                bcrypt.compare(password, hash, (err, isMatch) => {
                    if (!isMatch) {
                        res.status(404).send({ message: 'Password is incorrect' })
                    } else {
                        // res.send(req.body)
                        const user = results[0]
                        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'osm')

                        console.log(user);
                        // res.status(200).send({ token, user })
                        res.status(200).cookie('token', token).json({
                            email: user.email,
                            token:token,
                            role:user.role
                        })
                       
                    }
                })
            } else {
                res.status(404).send({ message: 'Email address is incorrect' })
            }
        }
    })
})

router.get('/profile', (req, res) => {
    // const authHeader = req.headers['authorization'];
    // if (authHeader) {
    //     // Split the header value by space to separate the Bearer keyword and the token
    //     const [bearer, token] = authHeader.split(' ');
    const {token} = req.cookies
        console.log(token);
        jwt.verify(token, 'osm', {}, (err, info) => {
            if (err) throw err
            if (!err) {
                console.log(info);
                res.json(info)
            }
        })
    // }
})

router.post('/logout', (req, res) => {
    console.log(req.cookies);
    res.cookie('token', '').json('ok')
})


module.exports = router