var db = require('../db');

module.exports = {
	index: function(req, res) {
		var user;
		if (req.session.user) {
			user = req.session.user;
		}
		console.log(user);
		db.recipe.findAll({
			limit: 3,
			order: [
				[ 'createdAt', 'DESC' ]
			]
		}).then(function(recipes) {
			db.category.findAll({

			}).then(function(categories) {
				res.render('index', { recipes: recipes, categories: categories, user: user});
			});
		}, function(e){
			res.render('error', {message: e.toString()});
		});

	}
};