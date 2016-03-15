var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var recipeController = require('../controllers/recipeController');

/* GET home page. */
router.get('/', homeController.index);
router.get('/recipe/new', recipeController.newRecipe);
router.get('/recipe/:id', recipeController.viewRecipe);

module.exports = router;
