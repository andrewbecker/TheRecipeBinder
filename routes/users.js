var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.get('/', authController.loginForm);
router.get('/users/signup', authController.signup);
router.post('/users', authController.createAccount);
router.post('/login', authController.login);
router.get('/logout', authController.logout);



module.exports = router;