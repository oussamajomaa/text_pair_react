const express = require('express')
const router = express.Router()
const { Client } = require('pg');


const pgConnection = new Client({
    user: 'oussama',
    host: 'localhost',
    database: 'ModERN',
    password: 'modern2024',
    port: 5432,
});

pgConnection.connect(err => {
    if (!err) {
        console.log('connection to database postgres ok');
    } else {
        console.log('connection to dtabase postgres failed', err);
    }
})

router.get('/alignment/:id',(req,res)=>{
    const {id} = req.params
    const query = `
        SELECT 
            tp.target_passage_id as target_id,
            tp.target_passage_context_before as target_before,
            tp.target_passage_content as target_content,
            tp.target_passage_context_after as target_after,
            
            sp.source_passage_id as source_id,
            sp.source_passage_context_before as source_before,
            sp.source_passage_content as source_content,
            sp.source_passage_context_after as source_after,
            
            t.text_first_publication_date AS target_year,
            t.text_title AS target_title,
            a.author_name AS target_author,
            ts.text_first_publication_date AS source_year,
            ts.text_title AS source_title,
            sa.author_name AS source_author,
            alignment_id
            FROM 
                passage_relationship pr
            JOIN 
                target_passage tp ON pr.target_passage_id = tp.target_passage_id
            JOIN 
                source_passage sp ON pr.source_passage_id = sp.source_passage_id
            JOIN 
                text t ON tp.target_passage_text_filename = t.text_filename
            JOIN 
                text_author ta ON t.text_id = ta.text_id
            JOIN 
                author a ON ta.author_id = a.author_id
            JOIN 
                text ts ON sp.source_passage_text_filename = ts.text_filename
            JOIN 
                text_author sta ON ts.text_id = sta.text_id
            JOIN 
                author sa ON sta.author_id = sa.author_id
            WHERE alignment_id = $1
        `
        pgConnection.query(query,[id],(err,results)=> {
            if (!err) {
               
                res.json(results.rows)
            }
        })
})



module.exports = router