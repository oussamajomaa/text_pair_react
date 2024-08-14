// const express = require('express')
// const userRoute = require('./routes/user')
// const alignementRoute = require('./routes/alignement')
// const cors = require('cors')
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser')




// const app = express()

// // Augmenter la limite de taille de la charge utile à 50 Mo
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
// app.use(cookieParser())
// app.use(express.json())
// app.use('',userRoute)
// app.use('',alignementRoute)



// app.listen(3500,()=> {
//     console.log('server running on port 3500');
// })

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const routePostgres = require('./routes/routePostgres');
// const routeMysql = require('./routes/routeMysql');
const routeAlignment = require('./routes/alignement')
const routeUser = require('./routes/user')
const cookieParser = require('cookie-parser');
const app = express();


// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    //   origin: 'http://134.157.57.237',  
    credentials: true // Enable credentials (cookies, HTTP authentication, etc.)
}));

// Configure middlewares
// Augmenter la limite de taille de la charge utile à 50 Mo
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Define routes
// app.use('', routePostgres);
// app.use('', routeMysql);
app.use('',routeAlignment);
app.use('',routeUser);

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'hello world' });
});


// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(3500, () => {
    console.log('server running on port 3500');
});


