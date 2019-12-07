var express = require('express');
var router = express.Router();
// const pageController = require('./controller/pageController')
// const widgetController = require('./controller/widgetController')
const userController = require('./controller/v2/userController');
const ProductController = require('./controller/v2/productController');

const AuthController = require('./controller/Auth/AuthController');

router.get('/users/logout' , AuthController.Auth , userController.logout);
router.post('/product/wishlist' , AuthController.Auth , ProductController.wishlist);
router.get('/product/list/wishlist' , AuthController.Auth , ProductController.getWishList);

module.exports = router ;