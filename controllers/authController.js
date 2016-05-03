var db = require('../db'),
	_ = require('underscore'),
	cryptojs = require('crypto-js');

module.exports = {
	signup: function(req, res) {
		res.render('signup', {csrfToken: req.csrfToken()});
	},
	createAccount: function(req, res) {
		for (var key in req.body) {
			req.body[key] = req.sanitize(req.body[key]);
		}
		var body = _.pick(req.body, 'username', 'password', 'first_name', 'last_name');

		db.user.create(body).then(function(user) {
			res.json(user);
		}, function(e) {
			res.status(400).json(e);
		});
	},
	login: function(req, res) {
		for (var key in req.body) {
			req.body[key] = req.sanitize(req.body[key]);
		}
		var body = _.pick(req.body, 'username', 'password');
		var userInstance;
		var originalUrl = req.header('Referer');
		if (originalUrl === 'http://localhost:3000/users') {
			originalUrl = '/';
		}
		
		db.user.authenticate(body).then(function(user) {
			var token = user.generateToken('authentication');
			userInstance = user;
			req.session.user = user.toPublicJSON();

			return db.token.create({
				token: token
			});
		}).then(function(tokenInstance) {
			req.session.auth = tokenInstance.token;
			res.redirect(originalUrl || '/');
		}).catch(function () {
			res.redirect('/');
		});
	},
	loginForm: function(req, res) {
		res.render('loginForm', { csrfToken: req.csrfToken() });
	},
	logout: function(req, res) {
		req.session.destroy(function(err) {
			if (err) { throw err; }
		});
		res.redirect('/');
	}
};
