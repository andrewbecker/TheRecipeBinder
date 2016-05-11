var db = require('../db');
if (process.env.NODE_ENV === 'production') {
	var googleTracking = true;
} else {
	var googleTracking = false;
}

module.exports = {
	index: function(req, res) {
		var user = null;
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

			db.category.findAll({
			}).then(function(categories) {
				allCategories = categories;
				db.recipe.findAll({
					order: [
						[ 'createdAt', 'ASC' ]
					]
				}).then(function(allRecipes) {
					res.render('index', { recipes: recipes, categories: allCategories, allRecipes: allRecipes, user: user, title: 'The Recipe Binder', csrfToken: req.csrfToken(), google: googleTracking });
					// , success: req.flash('success'), error: req.flash('error')
				});

			});
		}, function(e){
			res.render('error', {message: e.toString(), csrfToken: req.csrfToken()});
		});

	},
	test: function(req, res) {
		var user = 0;
		if (req.session && req.session.user) {
			user = req.session.user;
		}
		db.category.findAll({
			include: {
				model: db.recipe,
				limit: 5
			},
			order: [
				['category', 'ASC']
			]
		}).then(function(categories) {
			res.render('index2', {categories: categories, user: user, title: 'The Recipe Binder', csrfToken: req.csrfToken(), google: googleTracking });
		});
	}

};
