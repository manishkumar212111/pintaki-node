var express = require('express');
var router = express.Router();
const pageController = require('./controller/pageController')
const widgetController = require('./controller/widgetController')

const testWare = (req, res, next) => {
    next();
} 
router.get('/home' , testWare , pageController.home);
router.get('/projects/add' , testWare , pageController.addProject);
router.get('/blogs/add' , testWare , pageController.addBlog);
router.get('/project/list' , testWare , pageController.projectList);
router.get('/blog/list' , testWare , pageController.blogList);

router.get('/blog/detail' , testWare , pageController.blogDetail);
router.get('/project/detail' , testWare , pageController.projectDetail);

router.post('/leads' , testWare , widgetController.leadSubmit);
router.post('/contacts' , testWare , widgetController.contactUs);
router.post('/auth' , testWare , widgetController.auth);

module.exports = router ;