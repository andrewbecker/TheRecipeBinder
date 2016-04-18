var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

router.get('/', authController.loginForm);

router.post('/login', authController.login);
router.get('/logout', authController.logout);



module.exports = router;