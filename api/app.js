const express = require('express')
const userRoute = require('./routes/user')
const alignementRoute = require('./routes/alignement')
const cors = require('cors')
const cookieParser = require('cookie-parser');




const app = express()
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use(express.json())
app.use('',userRoute)
app.use('',alignementRoute)



app.listen(3333,()=> {
    console.log('server running on port 3333');
})