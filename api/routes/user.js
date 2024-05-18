const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const connection = require('../db')



// REGISTER
router.post('/register', (req, res) => {
    const user = req.body
    const { token } = req.cookies
    console.log(user)

    // console.log(token);
    jwt.verify(token, 'osm', {}, (err, info) => {
        if (err) throw err
        if (!err) {

            const hash = bcrypt.hashSync(user.password, 10)
            user.password = hash
            connection.query("SELECT * FROM user WHERE email = ?", [user.email], (err, results) => {
                // console.log(results.length);
                if (results.length > 0) {
                    res.status(409).send({ message: 'Cet E-mail existe déjà!' })
                } else {
                    connection.query('INSERT INTO user SET ?', user, (err, rows) => {
                        if (!err) {
                            res.status(200).send({ message: `L'utilisateur ${user.email} a été ajouté` })
                        }
                    })
                }
            })
        }
    })
    // console.log(user.role);
})

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body
    // console.log(email);
    const query = 'SELECT * from user WHERE email = ?'
    connection.query(query, [email], (err, results) => {
        if (err) {
            // console.log(err);
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

                        // console.log(user);
                        // res.status(200).send({ token, user })
                        console.log(user.id);
                        res.status(200).cookie('token', token).json({
                            id:user.id,
                            email: user.email,
                            token: token,
                            role: user.role
                        })

                    }
                })
            } else {
                res.status(404).send({ message: 'Email address is incorrect' })
            }
        }
    })
})

router.get('/user', (req, res) => {
    connection.query('SELECT * from user order by email', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
        }
    })
})

router.get('/profile', (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, 'osm', {}, (err, info) => {
        if (err) throw err
        if (!err) {
            res.json(info)
        }
    })
})

router.post('/logout', (req, res) => {
    // console.log(req.cookies);
    res.cookie('token', '').json('ok')
})

router.delete('/user/:id', (req, res) => {
    const { token } = req.cookies
    const { id } = req.params
    let user
    connection.query(`select * from user where id=${id}`,(err, results)=>{
        if (!err) {
            user = results[0]
            console.log(user);
        }
    })
    jwt.verify(token, 'osm', {}, (err, info) => {
        if (err) throw err
        if (!err) {
            connection.query(`delete from user where id=${id}`, (err, results)=>{
                if (err) {
                    console.log(err)
                } else {
                    res.json({message:`L'utilsateur ${user.email} a été supprimé`})
                }
            })
            // res.json(token)
        }
    })
})


module.exports = router