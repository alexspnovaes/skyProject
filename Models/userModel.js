var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: String,
    telefones:[ 
        {
            numero: String,
            ddd: String
        } 
    ],
    data_criacao: {
        type: Date,
        default: Date.now
    },
    data_atualizacao: {
        type: Date,
        default: Date.now
    },
    data_ultimo_login:{
        type: Date,
        default: Date.now
    }
});

// Export User model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}