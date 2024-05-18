const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const connection = require('../db')

router.get('/alignement', (req, res) => {
    connection.query('select * from passage', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
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

router.post('/search', (req, res) => {
    const {
        source_passage,
        source_author,
        source_title,
        source_date,
        target_passage,
        target_author,
        target_title,
        target_date
    } = req.body
    connection.query(`select * from passage where 
    source_passage like ? and
    source_author like ? and 
    source_title like ? and
    source_date like ? and
    target_passage like ? and
    target_author like ? and 
    target_title like ? and
    target_date like ?
    `
        , [
            '%' + source_passage + '%',
            '%' + source_author + '%',
            '%' + source_title + '%',
            '%' + source_date + '%',
            '%' + target_passage + '%',
            '%' + target_author + '%',
            '%' + target_title + '%',
            '%' + target_date + '%',
        ], (err, results) => {
            if (!err) {
                console.log(('hi'));
                res.json(results)
            } else {
                console.log(err);
            }
        })
})

router.get('/evaluate', (req,res) => {
    connection.query(`select *,evaluation.id from passage
        inner join evaluation on passage.id = evaluation.alignement_id
        inner join user on user.id = evaluation.user_id order by user.id
    `, (err,resultes) => {
        if (!err) {
            console.log(resultes);
            res.json(resultes)
        } else {
            console.log(err);
        }
    })
})

router.patch('/validate', (req,res) => {
    const { validate, textId } = req.body
    console.log(validate,textId);
    connection.query(`UPDATE evaluation SET validate = ? where id = ${textId}`, validate, (err, row) => {
        if (!err) {
            res.json({ message: 'commentaire ajouté' })
        } else {
            console.log('error update', err);
            res.json(err)
        }
    })
})
module.exports = router