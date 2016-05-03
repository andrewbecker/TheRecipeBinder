var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var recipeController = require('../controllers/recipeController');
var authController = require('../controllers/authController');
var csrf = require('csurf');
var csrfProtection = csrf();

if (process.env.NODE_ENV === 'production') {
	var tempUploadPath = '/home/ryanrecipes/node/recipes/public/uploads/'
} else {
	var tempUploadPath = './public/uploads/'
}
var multer = require('multer');
var upload = multer({ dest: tempUploadPath });
var db = require('../db');
var middleware = require('../middleware')(db);

router.all('*', csrfProtection);

/* GET home page. */
router.get('/', homeController.index);
router.get('/recipe/view/:id', recipeController.viewRecipe);

/* Following routes require the user to be logged in */
//router.all(middleware.requireAuthentication);

router.get('/myrecipes', middleware.requireAuthentication, recipeController.myRecipes);
router.get('/recipe/new', middleware.requireAuthentication, recipeController.newRecipe);
router.post('/recipe/new', middleware.requireAuthentication, upload.single('image'), recipeController.doNewRecipe);
router.get('/recipe/update/:id', middleware.requireAuthentication, recipeController.editRecipe);
router.put('/recipe/update/:id', middleware.requireAuthentication, upload.single('image'), recipeController.updateRecipe);
router.delete('/recipe/delete/:id', middleware.requireAuthentication, recipeController.deleteRecipe);
router.get('/recipe/category/:categoryId', recipeController.getRecipesByCategory);

module.exports = router;
