var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var recipeController = require('../controllers/recipeController');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' })

/* GET home page. */
router.get('/', homeController.index);
router.get('/recipe/new', recipeController.newRecipe);
router.post('/recipe/new', upload.single('image'), recipeController.doNewRecipe);
router.get('/recipe/:id', recipeController.viewRecipe);

module.exports = router;
