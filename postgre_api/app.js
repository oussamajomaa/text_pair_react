const express = require('express')
const cors = require('cors')
const routePostgres = require('./routePostgres')
const routeMysql = require('./routeMysql')

const app = express()
app.use(cors())


app.use(express.json())


app.use('',routePostgres)
app.use('',routeMysql)

app.listen(4444,()=> {
    console.log('server running on port 3500');
})




