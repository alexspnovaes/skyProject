let jwt = require('jsonwebtoken');
// Import user model
User = require('../Models/userModel');

// Handle create user actions
exports.signin = function (req, res) {
    User.findOne({email:req.body.email}, function(err, user) {
        if (err) throw err;
        
        if(req.body.email === user.email && req.body.senha === user.senha){
            //auth ok
            //todo: atualizar a data de último login
            const email = user.email; 
            var token = jwt.sign({ email }, process.env.SECRET, {
              expiresIn: 300 // expires in 5min
            });
            res.status(200).send({ auth: true, token: token });
          }
          else
            res.status(500).send('Login inválido!');
      });
};

exports.signout = function (req, res) {
    res.status(200).send({ auth: false, token: null });
};