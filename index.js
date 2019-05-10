// Imports
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let helmet = require('helmet')

// Initialize the app
let app = express()

require('dotenv-safe').load()

// Import routes
let apiRoutes = require('./api-routes')

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://skyuser:al3x4ndr31987@ds153566.mlab.com:53566/sky')
// Setup server port
var port = process.env.PORT || 8080
// Send message for default URL
app.get('/', (req, res) => res.send('skyProject is Running!'))

// Use Api routes in the App
app.use('/api', apiRoutes)

app.use(function (req, res, next) {
  return res.status(404).send({ mensagem: 'Não encontrado' })
})

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running skyProject on port ' + port)
})
