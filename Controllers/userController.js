let jwt = require('jsonwebtoken');
// Import user model
User = require('../Models/userModel');
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "users retrieved successfully",
            data: users
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.nome = req.body.nome ? req.body.nome : user.nome;
    user.email = req.body.email;
    user.senha = req.body.senha;
    user.telefones = req.body.telefones;

    //todo: validar se e-mail já existe

    const email = user.email;
    var token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });

    user.token = token;

    // save the user and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
       

        res.json({
            message: 'Novo usuário criado!',
            data: user,
            token: token
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
        res.send(err);
        res.json({
            message: 'user details loading..',
            data: user
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
        res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;
        // save the user and check for errors
        user.save(function (err) {
            if (err)
            res.json(err);
            res.json({
                message: 'user Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    user.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
        res.send(err);
        res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};