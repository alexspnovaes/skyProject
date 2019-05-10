let jwt = require('jsonwebtoken')
// Import user model
let User = require('../Models/userModel')
// Import bcrypt
let bcrypt = require('bcrypt')

// Handle create user actions
exports.signin = function (req, res) {
  if (!req) return res.status(422).send({ mensagem: 'Nenhum parâmetro foi enviado' })
  if (!req.body.email) return res.status(422).send({ mensagem: 'O parâmetro e-mail não pode ser em branco' })
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ mensagem: 'Erro ao efetuar login: ' + err })
    if (!user) return res.status(404).send({ mensagem: 'Usuário e/ou senha inválidos' })
    if (req.body.email === user.email && bcrypt.compareSync(req.body.senha, user.senha)) {
      const email = user.email
      var token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: 1800 // expires in 5min
      })

      user.token = token
      user.data_ultimo_login = Date.now()

      user.save(function (err) {
        if (err) return res.status(500).send({ mensagem: 'Erro ao efetuar login: ' + err })
        return res.status(200).send({
          usuario: {
            id: user.id,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.data_ultimo_login,
            token: user.token
          }
        })
      })
    } else return res.status(401).send({ mensagem: 'Usuário e/ou senha inválidos' })
  })
}
