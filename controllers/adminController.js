var db = require('../db');
var _ = require('underscore');

module.exports = {
	home: function(req, res) {
		var user;
		if (req.session.user) {
			user = req.session.user;
		}

		db.category.findAll({
				order: [
					['category', 'ASC']
				]
			}).then(function(category) {
			res.render('admin/categories', { category: category, user: user, csrfToken: req.csrfToken() })
		});
	},
	newCategory: function(req, res) {
		var body = _.pick(req.body, 'category');
		
		db.category.create(body).then(function() {
			res.redirect('/admin');
		});
	}
};

