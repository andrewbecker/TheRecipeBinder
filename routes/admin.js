var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
var db = require('../db');
var middleware = require('../middleware')(db);

router.all('*', middleware.requireAuthentication);

router.get('/', adminController.home);
router.post('/categories', adminController.newCategory);



module.exports = router;