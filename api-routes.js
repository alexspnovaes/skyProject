// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
let jwt = require('jsonwebtoken');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import user controller
var userController = require('./Controllers/userController');
var authenticationController = require('./Controllers/authenticationController');

// user routes
router.route('/user')
.get(verifyJWT,userController.index)
.post(userController.signup);

router.route('/user/:user_id')
.get(verifyJWT,userController.view)
.patch(verifyJWT,userController.update)
.put(verifyJWT,userController.update)
.delete(verifyJWT,userController.delete);

// sigin routes
router.route('/signin')
.post(authenticationController.signin);

router.route('/logout')
.get(authenticationController.signout);


function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Token em branco.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar com o token.' });
        
        req.email = decoded.email;
        next();
    });
}



// Export API routes
module.exports = router;