var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.get('/', authController.loginForm);
router.get('/signup', authController.signup);
router.post('/', authController.createAccount);
router.post('/login', authController.login);
router.get('/logout', authController.logout);



module.exports = router;