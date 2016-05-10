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
			limit: 4,
			order: [
				[ 'createdAt', 'DESC' ]
			]
		}).then(function(recipes) {
			newRecipes = recipes;
			console.log('These are the new recipes: ' + recipes);

			db.category.findAll({
			}).then(function(categories) {
				allCategories = categories;
				db.recipe.findAll({
					order: [
						[ 'createdAt', 'ASC' ]
					]
				}).then(function(allRecipes) {
					res.render('index', { recipes: recipes, categories: allCategories, allRecipes: allRecipes, user: user, title: 'The Recipe Binder', csrfToken: req.csrfToken() });
					// , success: req.flash('success'), error: req.flash('error')
				});

			});
		}, function(e){
			res.render('error', {message: e.toString(), csrfToken: req.csrfToken()});
		});

	}
};
