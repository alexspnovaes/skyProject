// Import JWT
let jwt = require('jsonwebtoken')
// Import user model
let User = require('../Models/userModel')
// Import bcrypt
let bcrypt = require('bcrypt')

exports.signup = function (req, res) {
  if (!req) return res.status(422).send({ mensagem: 'Nenhum parâmetro foi enviado' })
  validateEmail(req.body.email).then(function (exists) {
    if (exists) { return res.status(409).send({ mensagem: 'Esse e-mail já existe' }) }

    let hash = bcrypt.hashSync(req.body.senha, 10)

    var user = new User()
    user.nome = req.body.nome ? req.body.nome : user.nome
    user.email = req.body.email
    user.senha = hash
    user.telefones = req.body.telefones

    const email = user.email
    var token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: 1800 // expires in 5min
    })

    user.token = token

    // save the user and check for errors
    user.save(function (err) {
      if (err) { return res.status(500).send({ mensagem: 'Erro ao efetuar o signup:' + err }) }

      return res.status(200).send({
        mensagem: 'Usuário criado com sucesso',
        usuario: {
          id: user.id,
          data_criacao: user.data_criacao,
          data_atualizacao: user.data_atualizacao,
          ultimo_login: user.data_ultimo_login,
          token: user.token
        }
      })
    })
  })
}
// Handle view user info
exports.view = function (req, res) {
  if (!req) return res.status(422).send({ mensagem: 'Nenhum parâmetro foi enviado' })
  if (!req.params.user_id) return res.status(422).send({ mensagem: 'O parâmetro id não pode ser em branco' })
  User.findById(req.params.user_id, function (err, user) {
    if (err) { return res.status(500).send({ mensagem: 'Erro ao selecionar o usuário:' + err }) }
    return res.status(200).send({
      usuario: user
    })
  })
}

function validateEmail (email) {
  return User.findOne({ email: email }).then(function (result) {
    return result !== null
  })
}
