const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const connection = require('../db')


// router.get('/passage',(req,res)=>{
//     const query = `
//         SELECT 
//             tp.target_passage_id as target_id,
//             tp.target_passage_context_before as target_before,
//             tp.target_passage_content as target_content,
//             tp.target_passage_context_after as target_after,

//             sp.source_passage_id as source_id,
//             sp.source_passage_context_before as source_before,
//             sp.source_passage_content as source_content,
//             sp.source_passage_context_after as source_after,

//             t.text_first_publication_date AS target_year,
//             t.text_title AS target_title,
//             a.author_name AS target_author,
//             ts.text_first_publication_date AS source_year,
//             ts.text_title AS source_title,
//             sa.author_name AS source_author
//             FROM 
//                 passage_relationship pr
//             JOIN 
//                 target_passage tp ON pr.target_passage_id = tp.target_passage_id
//             JOIN 
//                 source_passage sp ON pr.source_passage_id = sp.source_passage_id
//             JOIN 
//                 text t ON tp.target_passage_text_filename = t.text_filename
//             JOIN 
//                 text_author ta ON t.text_id = ta.text_id
//             JOIN 
//                 author a ON ta.author_id = a.author_id
//             JOIN 
//                 text ts ON sp.source_passage_text_filename = ts.text_filename
//             JOIN 
//                 text_author sta ON ts.text_id = sta.text_id
//             JOIN 
//                 author sa ON sta.author_id = sa.author_id
//             WHERE tp.target_passage_id <=100
//         `
//         connection.query(query,(err,results)=> {
//             if (!err) {
//                 res.json(results.rows)
//             }
//         })
// })


// router.get('/alignement', (req, res) => {

//     connection.query('select * from passage', (err, results) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(results);
//         }
//     })
// })

// router.post('/add_pg',(req,res)=> {
//     const alignment = req.body
//     console.log(alignment);

//     connection.query('INSERT INTO alignment SET ?', alignment,(err,row)=>{
//         if (!err) {
//             res.status(200).send({ message: `Alignment a été ajouté` })
//         }
//     })
// })


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

// router.post('/search', (req, res) => {
//     const {
//         source_content,
//         source_author,
//         source_title,
//         source_year,
//         target_content,
//         target_author,
//         target_title,
//         target_year
//     } = req.body
//     const query = `
//         SELECT 
//             tp.target_passage_context_before as target_before,
//             tp.target_passage_content as target_content,
//             tp.target_passage_context_after as target_after,
//             tp.target_passage_id,


//             sp.source_passage_context_before as source_before,
//             sp.source_passage_content as source_content,
//             sp.source_passage_context_after as source_after,

//             t.text_first_publication_date AS target_year,
//             t.text_title AS target_title,
//             a.author_name AS target_author,
//             ts.text_first_publication_date AS source_year,
//             ts.text_title AS source_title,
//             sa.author_name AS source_author
//             FROM 
//                 passage_relationship pr
//             JOIN 
//                 target_passage tp ON pr.target_passage_id = tp.target_passage_id
//             JOIN 
//                 source_passage sp ON pr.source_passage_id = sp.source_passage_id
//             JOIN 
//                 text t ON tp.target_passage_text_filename = t.text_filename
//             JOIN 
//                 text_author ta ON t.text_id = ta.text_id
//             JOIN 
//                 author a ON ta.author_id = a.author_id
//             JOIN 
//                 text ts ON sp.source_passage_text_filename = ts.text_filename
//             JOIN 
//                 text_author sta ON ts.text_id = sta.text_id
//             JOIN 
//                 author sa ON sta.author_id = sa.author_id

//             where
//             sp.source_passage_content LIKE $1 AND
//             sa.author_name LIKE $2 AND 
//             ts.text_title LIKE $3 AND
//             ts.text_first_publication_date LIKE $4 AND
//             tp.target_passage_content LIKE $5 AND
//             a.author_name LIKE $6 AND 
//             t.text_title LIKE $7 AND
//             t.text_first_publication_date LIKE $8 AND
//             tp.target_passage_id < 100;
//     `

//     const values = [
//         '%' + source_content + '%',
//         '%' + source_author + '%',
//         '%' + source_title + '%',
//         '%' + source_year + '%',
//         '%' + target_content + '%',
//         '%' + target_author + '%',
//         '%' + target_title + '%',
//         '%' + target_year + '%',
//     ];
//     connection.query(query
//         , 
//         values, (err, results) => {
//             if (!err) {
//                 console.log(results.rowCount);
//                 res.json(results.rows)
//             } else {
//                 console.log(err);
//             }
//         })
// })

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
