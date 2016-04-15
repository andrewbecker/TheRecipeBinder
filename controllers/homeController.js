var db = require('../db');

module.exports = {
	index: function(req, res) {
		var user = 0;
		if (req.session && req.session.user) {
			user = req.session.user;
		}
		var newRecipes;
		var allCategories;
		db.recipe.findAll({
			limit: 3,
			order: [
				[ 'createdAt', 'DESC' ]
			]
		}).then(function(recipes) {
			newRecipes = recipes;

			db.category.findAll({
			}).then(function(categories) {
				allCategories = categories;
				db.recipe.findAll({
					order: [
						[ 'createdAt', 'DESC' ]
					]
				}).then(function(allRecipes) {
					res.render('index', { recipes: recipes, categories: allCategories, allRecipes: allRecipes, user: user, title: 'My e-Recipe Book'});
				})

			});
		}, function(e){
			res.render('error', {message: e.toString()});
		});

	}
};
