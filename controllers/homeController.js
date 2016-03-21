var db = require('../db');

module.exports = {
	index: function(req, res) {
		db.recipe.findAll({
			limit: 3,
			order: [
				[ 'createdAt', 'DESC' ]
			]
		}).then(function(recipes) {
			console.log(recipes);
			// res.render('index', {recipes: recipes});
			db.category.findAll({

			}).then(function(categories) {
				res.render('index', { recipes: recipes, categories: categories});
			});
		}, function(e){
			res.render('error', {message: e.toString()});
		});



	}
};