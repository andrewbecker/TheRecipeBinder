var db = require('../db');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var userMain = {first: 'Andy'};

var categoriesMain = ['Breakfast', 'Lunch', 'Dinner'];

// var sendJsonResponse = function(res, status, content) {
// 	res.status(status);
// 	res.json(content);
// };

module.exports = {
	viewRecipe: function(req, res) {
		var recipeId = parseInt(req.params.id, 10);

		db.recipe.findById(recipeId, {
			include: [{
				model: db.review
			}]
		}).then(function(recipe) {
			if (!recipe) {
				res.status(404);
				res.render('error', {
					message: 'recipe not found'
				});
			} else {
				// recipe.ingredients = recipe.ingredients.replace(/\s+/g, '').split("\n");
				recipe.ingredients = recipe.ingredients.split("\r\n");
				recipe.instructions = recipe.instructions.split("\r\n");
				console.log(recipe);
				console.log('******************************');
				console.log(recipe.reviews);
				res.render('viewRecipe', { recipe: recipe, review: recipe.reviews, categories: categoriesMain, title: recipe.title });
			}
			
		});

	},
	newRecipe: function(req, res) {
		res.render('newRecipe', { title: 'New Recipe', user: userMain});
	},
	doNewRecipe: function(req, res) {
		if (req.file) {
			console.log(req.file.path);
			var tempPath = req.file.path,
				ext = path.extname(req.file.originalname).toLowerCase(),
				targetPath = path.resolve('./public/finalUpload/' + req.file.filename + ext);
			var newFileName = req.file.filename + ext;


			fs.rename(tempPath, targetPath, function (err) {
			});
		}




		var body = _.pick(req.body, 'title', 'description', 'ingredients', 'instructions', 'yield', 'prep_time', 'cook_time');
		body.image = newFileName;

		db.recipe.create(body).then(function(recipe) {
			res.redirect('/recipe/' + recipe.id);
		}, function(e) {
			res.render('error', {message: e.toString()});
		});
	}
};