var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var recipeController = require('../controllers/recipeController');
var authController = require('../controllers/authController');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });
var db = require('../db');
var middleware = require('../middleware')(db);


/* GET home page. */
router.get('/', homeController.index);
router.get('/recipe/view/:id', recipeController.viewRecipe);

router.all(middleware.requireAuthentication);


router.get('/recipe/new', recipeController.newRecipe);
router.post('/recipe/new', upload.single('image'), recipeController.doNewRecipe);

router.get('/recipe/update/:id', recipeController.editRecipe);
router.put('/recipe/update/:id', upload.single('image'), recipeController.updateRecipe);
router.delete('/recipe/delete/:id', recipeController.deleteRecipe);

// router.get('/users/login', authController.loginForm);
// // router.get('/users/signup', authController.signup);
// // router.post('/users', authController.createAccount);
// router.post('/users/login', authController.login);
// router.get('/users/logout', authController.logout);

module.exports = router;
