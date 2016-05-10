var db = require('../db');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

if (process.env.NODE_ENV === 'production') {
	var finalUploadPath = '/home/ryanrecipes/node/recipes/public/finalUpload/';
} else if (process.env.NODE_ENV === 'staging') {
	var finalUploadPath = '/home/andy/node/recipes/public/finalUpload/';
} else {
	var finalUploadPath = './public/finalUpload/';
}


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

/******* Testing for image resizing *********/
// require image processing gulpfile
var editor = path.resolve(__dirname, '../editor.js');

function compressAndResize (imageUrl) {
	var childProcess = require('child_process').fork(editor);

	childProcess.on('message', function(message) {
		console.log(message);
	});

	childProcess.on('error', function(error) {
	    console.error(error.stack)
	});
	childProcess.on('exit', function() {
		console.log('process exited');
	});
	childProcess.send(imageUrl);
}





/****** End Image resizing ******/


module.exports = {
	viewRecipe: function(req, res) {
		var user;
		if (req.session.user) {
			user = req.session.user;
		}
		var recipeId = parseInt(req.params.id, 10);
		var slug = req.params.slug;

		db.recipe.findOne({
			where: {
				id: recipeId,
				slug: slug
			},
			include: [{
				model: db.review,
				model: db.user
			}]
		}).then(function(recipe) {
			if (!recipe) {
				res.status(404);
				res.render('error', {
					message: 'recipe not found', csrfToken: req.csrfToken()
				});
			} else {
				db.category.findAll({
					order: [
						['category', 'ASC']
					]
				}).then(function(categories) {
					recipe.total_time = generateHoursMinutes(recipe.prep_time + recipe.cook_time);
					recipe.prep_time = generateHoursMinutes(recipe.prep_time);
					recipe.cook_time = generateHoursMinutes(recipe.cook_time);

					if (recipe.ingredients) { recipe.ingredients = recipe.ingredients.split("\r\n"); }
					if (recipe.instructions) { recipe.instructions = recipe.instructions.split("\r\n"); }
					res.render('viewRecipe', { recipe: recipe, review: recipe.reviews, categories: categories, title: recipe.title, user: user, csrfToken: req.csrfToken() });
				});
				
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
				res.render('newRecipe', { title: 'New Recipe', user: user, categories: categories, csrfToken: req.csrfToken()});
		});
	},
	doNewRecipe: function(req, res) {
		for (var key in req.body) {
			req.body[key] = req.sanitize(req.body[key]) || undefined;
		}
		var body = _.pick(req.body, 'title', 'description', 'ingredients', 'instructions', 'yield', 'prep_time', 'cook_time', 'categoryId');
		body.userId = req.session.user.id;
		
		if (req.file) {
			var tempPath = req.file.path,
				ext = path.extname(req.file.originalname).toLowerCase(),
				//targetPath = path.resolve(finalUploadPath + req.file.filename + ext);
				targetPath = path.resolve(finalUploadPath);
			fs.renameSync(tempPath, tempPath + ext);
			var newFileName = req.file.filename + ext;
			var imageFile = tempPath + ext;

			
			body.image = newFileName;

			sharp(imageFile)
				.resize(450, 450)
				.max()
				.toFile(finalUploadPath + req.file.filename + '.jpg', function(err, info) {
					body.image = req.file.filename + '.jpg';
					fs.unlinkSync(path.resolve(tempPath + ext));

					console.log(path.resolve(__dirname, '../public/finalUpload/' + body.image));
					compressAndResize(path.resolve(__dirname, '../public/finalUpload/' + body.image));

					db.recipe.create(body).then(function(recipe) {
						res.redirect('/recipe/view/' + recipe.id + '/' + recipe.slug);
					}, function(e) {
						console.log(e.message);
						res.render('error', {message: e.toString(), csrfToken: req.csrfToken()});
					});
				});
				

			//fs.renameSync(tempPath, targetPath);
		} else {

			db.recipe.create(body).then(function(recipe) {
				res.redirect('/recipe/view/' + recipe.id + '/' + recipe.slug);
			}, function(e) {
				console.log(e.message);
				res.render('error', {message: e.toString(), csrfToken: req.csrfToken()});
			});
		}
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
				var title = 'Update - ' + recipe.title;
				res.render('updateRecipe', { recipe: recipe, title: title, user: user, categories: categories, csrfToken: req.csrfToken()});
			});
		});
	},
	updateRecipe: function(req, res) {
		var recipeId = parseInt(req.params.id, 10);
		for (var key in req.body) {
			req.body[key] = req.sanitize(req.body[key]);
		}
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
						// targetPath = path.resolve(finalUploadPath + req.file.filename + ext);
						targetPath = path.resolve(finalUploadPath);
					var newFileName = req.file.filename + ext;

					body.image = newFileName;

					fs.renameSync(tempPath, tempPath + ext);
					var imageFile = tempPath + ext;

					sharp(imageFile)
						.resize(450, 450)
						.max()
						.toFile(finalUploadPath + req.file.filename + '.jpg', function(err, info) {
							console.log("error " + err);
							console.log("info " + info);
							body.image = req.file.filename + '.jpg';
							fs.unlinkSync(path.resolve(tempPath + ext));

							compressAndResize(path.resolve(__dirname, '../public/finalUpload/' + body.image));

							if (oldFileName) {
								if (fs.existsSync(path.resolve(finalUploadPath + oldFileName))) {
									fs.unlinkSync(path.resolve(finalUploadPath + oldFileName));
								}
								if (fs.existsSync(path.resolve(finalUploadPath + 'thumbs/' + oldFileName))) {
									fs.unlinkSync(path.resolve(finalUploadPath + 'thumbs/' + oldFileName));
								}
							}

							recipe.update(body).then(function(recipe) {
								res.redirect('/recipe/view/' + recipe.id + '/' + recipe.slug);
							}, function(e) {
								res.render('error', {message: e.toString(), csrfToken: req.csrfToken()});
							});


						});

					// console.log("tempPath: " + tempPath);
					// console.log("newFileName: " + newFileName);


					// fs.renameSync(tempPath, targetPath);

					// if (oldFileName) {
					// 	fs.unlinkSync(path.resolve(finalUploadPath + oldFileName));
					// }
				} else {

					recipe.update(body).then(function(recipe) {
						res.redirect('/recipe/view/' + recipe.id + '/' + recipe.slug);
					}, function(e) {
						res.render('error', {message: e.toString(), csrfToken: req.csrfToken()});
					});
				}
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
				if (fs.existsSync(path.resolve(finalUploadPath + recipe.image))) {
					fs.unlinkSync(path.resolve(finalUploadPath + recipe.image));
				}
				if (fs.existsSync(path.resolve(finalUploadPath + 'thumbs/' + recipe.image))) {
					fs.unlinkSync(path.resolve(finalUploadPath + 'thumbs/' + recipe.image));
				}
			}

			db.recipe.destroy({
				where: {
					id: recipeId
				}
			}).then(function(rowsDeleted) {
				res.redirect('/');
			}, function() {
				res.render('error', { message: 'There was an error deleting recipe', csrfToken: req.csrfToken() });
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
			res.render('myRecipes', {recipes: recipes, user: user, title: 'Ryan Family Recipes', pageName: 'My Recipes', csrfToken: req.csrfToken()})
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
				var title = category.category + ' - The Recipe Binder';
				db.category.findAll().then(function(categories) {
					res.render('myRecipes', {recipes: recipes, user: user, title: title, categories: categories, pageName: category.category, csrfToken: req.csrfToken()});
				});
			});
		});
		
	}
};
