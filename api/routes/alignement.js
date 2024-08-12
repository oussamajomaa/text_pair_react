const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const connection = require('../db')


router.post('/search', (req, res) => {
    const {
        source_content,
        source_author,
        source_title,
        source_year,
        target_content,
        target_author,
        target_title,
        target_year
    } = req.body
    const values = [
        '%' + source_content + '%',
        '%' + source_author + '%',
        '%' + source_title + '%',
        '%' + source_year + '%',
        '%' + target_content + '%',
        '%' + target_author + '%',
        '%' + target_title + '%',
        '%' + target_year + '%',
    ];
    connection.query(`select * from alignment where 
    source_content like ? and
    source_author like ? and 
    source_title like ? and
    source_year like ? and
    target_content like ? and
    target_author like ? and 
    target_title like ? and
    target_year like ? 
    `
        , values, (err, results) => {
            if (!err) {
                res.json(results)
            } else {
                console.log(err);
            }
        })
})


router.post('/evaluate', (req, res) => {
    const { token } = req.cookies
    // console.log(token);
    const { user_id, alignement_id, comment, evaluate } = req.body
    const evaluation = req.body
    console.log(evaluation);
    connection.query(`select * from evaluation where user_id = ${user_id} and alignement_id = ${alignement_id}`, (err, results) => {
        if (!err) {
            if (results.length > 0) {
                const evaluation_id = results[0].id
                console.log('hi');
                connection.query(`UPDATE evaluation SET evaluate = ? where id = ${evaluation_id}`, evaluate, (err, results) => {
                    if (!err) {
                        res.status(200).send({ message: 'evaluation mise à jour' })
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log('hi');
                connection.query(`INSERT INTO evaluation SET ?`, evaluation, (err, row) => {
                    if (!err) {
                        console.log('hi hi');
                        res.status(200).send({ message: 'ok' })
                    } else {
                        console.log(err)
                    }
                })
            }
        } else {
            console.log(err);
        }
    })
})

router.post('/comment', (req, res) => {
    const { user_id, alignement_id, comment } = req.body
    connection.query(`select * from evaluation where user_id = ${user_id} and alignement_id = ${alignement_id}`, (err, results) => {
        if (!err) {
            if (results.length > 0) {
                const evaluation_id = results[0].id
                connection.query(`UPDATE evaluation SET comment = ? where id = ${evaluation_id}`, comment, (err, row) => {
                    if (!err) {
                        res.json({ message: 'commentaire ajouté' })
                    } else {
                        console.log('error update', err);
                        res.json(err)
                    }
                })
            } else {
                console.log('error select not found');
                res.json({ message: "commentaire n'exite pas" })
            }
        } else {
            console.log('error select', err);
            res.json(err)
        }
    })

})


router.get('/evaluate', (req, res) => {
    connection.query(`select *,evaluation.id from passage
        inner join evaluation on passage.id = evaluation.alignement_id
        inner join user on user.id = evaluation.user_id order by user.id
    `, (err, resultes) => {
        if (!err) {
            console.log(resultes);
            res.json(resultes)
        } else {
            console.log(err);
        }
    })
})

router.patch('/validate', (req, res) => {
    const { validate, textId } = req.body
    console.log(validate, textId);
    connection.query(`UPDATE evaluation SET validate = ? where id = ${textId}`, validate, (err, row) => {
        if (!err) {
            res.json({ message: 'commentaire ajouté' })
        } else {
            console.log('error update', err);
            res.json(err)
        }
    })
})

router.post('/alignment', (req, res) => {
    const alignment = req.body

    connection.query('INSERT INTO alignment SET ?', alignment, (err, row) => {
        if (!err) {
            res.status(200).send({ message: `Alignment a été ajouté` })
        }
    })
})

router.get('/truncate', (req, res) => {
    connection.query('TRUNCATE TABLE alignment', (err, row) => {
        if (!err) {
            res.json({ message: "Table truncated" })
        }
    })
})

module.exports = router
