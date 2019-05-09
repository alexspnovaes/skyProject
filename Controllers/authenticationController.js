let jwt = require('jsonwebtoken')
// Import user model
let User = require('../Models/userModel')
// Import bcrypt
let bcrypt = require('bcrypt')

// Handle create user actions
exports.signin = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ mensagem: 'Erro ao efetuar login: ' + err })

    if (req.body.email === user.email && bcrypt.compareSync(req.body.senha, user.senha)) {
      const email = user.email
      var token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      })

      user.token = token
      user.data_ultimo_login = Date.now()

      user.save(function (err) {
        if (err) return res.status(500).send({ mensagem: 'Erro ao efetuar login: ' + err })
        return res.status(200).send({ auth: true, token: token })
      })
    } else return res.status(500).send({ mensagem: 'Login inválido!' })
  })
}

exports.signout = function (req, res) {
  res.status(200).send({ auth: false, token: null })
}
