let http = require('http');
// Import express
let express = require('express')
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let helmet = require('helmet');

//let userServiceProxy = httpProxy('http://localhost:3001');
//let productsServiceProxy = httpProxy('http://localhost:3002');
let jwt = require('jsonwebtoken');

// Initialize the app
let app = express();

require("dotenv-safe").load();

// Import routes
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/sky');
var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon!'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }



