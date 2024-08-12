const express = require('express')
const cors = require('cors')
const routePostgres = require('./routePostgres')
const routeMysql = require('./routeMysql')


const app = express()
app.use(cors())


app.use(express.json())


app.use('',routePostgres)
app.use('',routeMysql)

app.get('/',(req,res)=>{
	res.json({message:'hello wordl'})
})

app.listen(3500,()=> {
    console.log('server running on port 3500');
})

// const sslServer = https.createServer(
//    {
//        key: fs.readFileSync('/etc/letsencrypt/live/modern-obtic.sorbonne-universite.fr/fullchain.pem'),
//        cert: fs.readFileSync('/etc/letsencrypt/live/modern-obtic.sorbonne-universite.fr/privkey.pem')
//    }
//    , app)

// sslServer.listen(3500, () => console.log(`Listening on port 3500`))



