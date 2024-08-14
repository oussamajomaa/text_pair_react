const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const connection = require('../db')


router.post('/search', (req, res) => {
    const { token } = req.cookies
    console.log(token);

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
    target_year like ? and
	target_year = "1526"
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
    console.log(token);
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
    connection.query(`select *,evaluation.id from alignment
        inner join evaluation on alignment.id = evaluation.alignement_id
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

router.get('/alignment_evaluated/:id', (req, res) => {
    const { id } = req.params
    console.log(id);
    
    const query = `
        SELECT a.*
        FROM alignment a
        JOIN evaluation e ON a.id = e.alignement_id
        WHERE e.user_id = ?
    `;

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(results.length);
        
        res.json(results);
    });
})


// router.post('/alignment', (req, res) => {
//     const alignment = req.body

//     connection.query('INSERT INTO alignment SET ?', alignment, (err, row) => {
//         if (!err) {
//             res.status(200).send({ message: `Alignment a été ajouté` })
//         }
//     })
// })

// Ajouter from postgres
router.post('/alignment', (req, res) => {
    const alignments = req.body;
    const values = alignments.map(alignment => [
        alignment.target_id,
        alignment.target_before,
        alignment.target_content,
        alignment.target_after,
        alignment.source_id,
        alignment.source_before,
        alignment.source_content,
        alignment.source_after,
        alignment.target_year,
        alignment.target_title,
        alignment.target_author,
        alignment.source_year,
        alignment.source_title,
        alignment.source_author,
        alignment.alignment_id
    ]);

    const query = `
        INSERT INTO alignment (
            target_id, target_before, target_content, target_after, 
            source_id, source_before, source_content, source_after, 
            target_year, target_title, target_author, 
            source_year, source_title, source_author, alignment_id
        ) VALUES ?
    `;

    connection.query(query, [values], (err, result) => {
        if (!err) {
            res.status(200).send({ message: `Alignments have been added` });
        } else {
            res.status(500).json({ error: err.message });
        }
    });
})


router.get('/truncate', (req, res) => {
    connection.query('TRUNCATE TABLE alignment', (err, row) => {
        if (!err) {
            res.json({ message: "Table truncated" })
        }
    })
})

module.exports = router
