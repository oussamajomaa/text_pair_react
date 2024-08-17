const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const connection = require('../db')


// REGISTER
router.post('/register', (req, res) => {
    const user = req.body;
	    console.log('Received cookies:', req.cookies); // Log les cookies reçus

    const { token } = req.cookies;
    console.log('Received token:', token); // Log the token to see if it's being received

    if (!token) {
        return res.status(401).send({ message: 'Token not provided' });
    }

    jwt.verify(token, 'osm', {}, (err, info) => {
        if (err) {
            return res.status(403).send({ message: 'Invalid token' });
        }

        // Proceed with registration if the token is valid
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        connection.query("SELECT * FROM user WHERE email = ?", [user.email], (err, results) => {
            if (results.length > 0) {
                res.status(409).send({ message: 'Cet E-mail existe déjà!' });
            } else {
                connection.query('INSERT INTO user SET ?', user, (err, rows) => {
                    if (!err) {
                        res.status(200).send({ message: `L'utilisateur ${user.email} a été ajouté` });
                    }
                });
            }
        });
    });
});

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * from user WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                let hash = results[0]['password'];
                bcrypt.compare(password, hash, (err, isMatch) => {
                    if (!isMatch) {
                        res.status(404).send({ message: 'Password is incorrect' });
                    } else {
                        const user = results[0];
                        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'osm');

                        res.status(200)
                            .cookie('token', token, {
                                httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
                                secure: false, // Set to true if using HTTPS
                                sameSite: 'Lax', // Adjust based on your CORS settings
				//domain: '134.157.57.237', // Adjust to match the backend server domain
    				path: '/',
                            })
                            .json({
                                id: user.id,
                                email: user.email,
                                token: token,
                                role: user.role
                            });
                    }
                });
            } else {
                res.status(404).send({ message: 'Email address is incorrect' });
            }
        }
    });
});

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
