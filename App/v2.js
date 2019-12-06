var express = require('express');
var router = express.Router();
// const pageController = require('./controller/pageController')
// const widgetController = require('./controller/widgetController')
const userController = require('./controller/v2/userController');
const AuthController = require('./controller/Auth/AuthController');

router.get('/users/logout' , AuthController.Auth , userController.logout);

module.exports = router ;