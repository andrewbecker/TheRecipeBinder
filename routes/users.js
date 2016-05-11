var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var csrf = require('csurf');
var csrfProtection = csrf();

router.all('*', csrfProtection);

router.get('/', authController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/', authController.createAccount);
router.get('/signup', authController.signup);


module.exports = router;