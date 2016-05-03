var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var db = require('../db');
var middleware = require('../middleware')(db);
var csrf = require('csurf');
var csrfProtection = csrf();

router.all('*', middleware.requireAuthentication);
router.all('*', csrfProtection);

router.get('/', adminController.home);
router.post('/categories', adminController.newCategory);



module.exports = router;