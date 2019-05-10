// Filename: api-routes.js
// Initialize express router
let router = require('express').Router()
let jwt = require('jsonwebtoken')
// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!'
  })
})

// Import user controller
var userController = require('./Controllers/userController')
var authenticationController = require('./Controllers/authenticationController')

// user routes
router.route('/user')
  .post(userController.signup)

router.route('/user/:user_id')
  .get(verifyJWT, userController.view)

// sigin routes
router.route('/signin')
  .post(authenticationController.signin)

function verifyJWT (req, res, next) {
  var token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ mensagem: 'Não autorizado' })

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err != null) {
      if (err.name === 'TokenExpiredError') return res.status(401).send({ mensagem: 'Sessão inválida' })
      return res.status(401).send({ mensagem: 'Não autorizado' })
    }
    req.email = decoded.email
    next()
  })
}

// Export API routes
module.exports = router
