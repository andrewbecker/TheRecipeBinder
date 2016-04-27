var db = require('../db');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');


if (process.env.NODE_ENV === 'production') {
	var finalUploadPath = '/home/ryanrecipes/node/recipes/public/finalUpload/';
} else {
	var finalUploadPath = './public/finalUpload/';
}

var categoriesMain = ['Breakfast', 'Lunch', 'Dinner'];

// var sendJsonResponse = function(res, status, content) {
// 	res.status(status);
// 	res.json(content);
// };

var generateHoursMinutes = function(minutes) {
	var time = {};
	time.hours = Math.floor(minutes / 60);
	time.min = minutes % 60;

	return time;
}

module.exports = {
	viewRecipe: function(req, res) {
		console.log('Full URL: ' + req.originalUrl);
		var user;
		if (req.session.user) {
			user = req.session.user;
		}
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
				recipe.total_time = generateHoursMinutes(recipe.prep_time + recipe.cook_time);
				recipe.prep_time = generateHoursMinutes(recipe.prep_time);
				recipe.cook_time = generateHoursMinutes(recipe.cook_time);

				if (recipe.ingredients) { recipe.ingredients = recipe.ingredients.split("\r\n"); }
				if (recipe.instructions) { recipe.instructions = recipe.instructions.split("\r\n"); }
				res.render('viewRecipe', { recipe: recipe, review: recipe.reviews, categories: categoriesMain, title: recipe.title, user: user });
			}

		});

	},
	newRecipe: function(req, res) {
		if (req.session.user) {
			var user = req.session.user;
		}
		db.category.findAll({
				order: [
					['category', 'ASC']
				]
			}).then(function(categories) {
			console.log(categories);
			res.render('newRecipe', { title: 'New Recipe', user: user, categories: categories});
		});
	},
	doNewRecipe: function(req, res) {
		if (req.file) {
			var tempPath = req.file.path,
				ext = path.extname(req.file.originalname).toLowerCase(),
				targetPath = path.resolve(finalUploadPath + req.file.filename + ext);
			var newFileName = req.file.filename + ext;


			fs.renameSync(tempPath, targetPath);
		}

		for (var key in req.body) {
			req.body[key] = req.body[key] || undefined;
		}
		var body = _.pick(req.body, 'title', 'description', 'ingredients', 'instructions', 'yield', 'prep_time', 'cook_time', 'categoryId');
		body.userId = req.session.user.id;
		body.image = newFileName;

		db.recipe.create(body).then(function(recipe) {
			res.redirect('/recipe/view/' + recipe.id);
		}, function(e) {
			console.log(e.message);
			res.render('error', {message: e.toString()});
		});
	},
	editRecipe: function(req, res) {
		var user;
		if (req.session.user) {
			user = req.session.user;
		}
		var recipeId = parseInt(req.params.id, 10);

		db.recipe.findById(recipeId, {
		}).then(function(recipe) {
			db.category.findAll({
				order: [
					['category', 'ASC']
				]
			}).then(function(categories) {
				console.log(categories);
				var title = 'Update - ' + recipe.title;
				res.render('updateRecipe', { recipe: recipe, title: title, user: user, categories: categories});
			});
		});
	},
	updateRecipe: function(req, res) {
		var recipeId = parseInt(req.params.id, 10);
		var body = _.pick(req.body, 'title', 'description', 'ingredients', 'instructions', 'yield', 'prep_time', 'cook_time', 'categoryId');

		db.recipe.findOne({
			where: {
				id: recipeId
			}
		}).then(function (recipe) {
			if (recipe) {
				if (req.file) {
					var oldFileName = recipe.image;
					var tempPath = req.file.path,
						ext = path.extname(req.file.originalname).toLowerCase(),
						targetPath = path.resolve(finalUploadPath + req.file.filename + ext);
					var newFileName = req.file.filename + ext;

					body.image = newFileName;


					fs.renameSync(tempPath, targetPath);

					if (oldFileName) {
						fs.unlinkSync(path.resolve(finalUploadPath + oldFileName));
					}
				}

				recipe.update(body).then(function(recipe) {
					res.redirect('/recipe/view/' + recipe.id);
				}, function(e) {
					res.render('error', {message: e.toString()});
				});
			}
		});
	},
	deleteRecipe: function(req, res) {
		var recipeId = parseInt(req.params.id, 10);
		db.recipe.findOne({
			where: {
				id: recipeId
			}
		}).then(function (recipe) {
			if (recipe.image) {
				fs.unlinkSync(path.resolve(finalUploadPath + recipe.image));
			}

			db.recipe.destroy({
				where: {
					id: recipeId
				}
			}).then(function(rowsDeleted) {
				console.log(rowsDeleted);
				res.redirect('/');
			}, function() {
				res.render('error', { message: 'There was an error deleting recipe' });
			});
		});
	},
	myRecipes: function(req, res) {
		var user = req.session.user;
		db.recipe.findAll({
			where: {
				userId: user.id
			}
		}).then(function(recipes) {
			res.render('myRecipes', {recipes: recipes, user: user, title: 'Ryan Family Recipes', pageName: 'My Recipes'})
		});
	},
	getRecipesByCategory: function(req, res) {
		var user = req.session.user;
		var categoryId = req.params.categoryId;
		db.category.findOne({
			where: {
				category: categoryId
			}
		}).then(function(category) {
			db.recipe.findAll({
				where: {
					categoryId: category.id
				}
			}).then(function(recipes) {
				db.category.findAll().then(function(categories) {
					res.render('myRecipes', {recipes: recipes, user: user, title: 'The Recipe Binder', categories: categories, pageName: category.category});
				});
			});
		});
		
	}
};
