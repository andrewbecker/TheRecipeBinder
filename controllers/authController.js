var db = require('../db'),
	_ = require('underscore'),
	cryptojs = require('crypto-js');

if (process.env.NODE_ENV === 'production') {
	var googleTracking = true;
} else {
	var googleTracking = false;
}

module.exports = {
	signup: function(req, res) {
		res.render('signup', {csrfToken: req.csrfToken(), google: googleTracking});
	},
	createAccount: function(req, res) {
		for (var key in req.body) {
			req.body[key] = req.sanitize(req.body[key]);
		}
		var body = _.pick(req.body, 'username', 'password', 'first_name', 'last_name');

		db.user.create(body).then(function(user) {
			res.json(user);
		}, function(e) {
			req.flash('error', 'There was an error creating your account');
			res.redirect('/');
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
			req.flash('success', 'You have logged in!');
			req.session.auth = tokenInstance.token;
			res.redirect(originalUrl || '/');
		}).catch(function () {
			req.flash('error', 'Username or password incorrect');
			res.redirect('/users');
		});
	},
	loginForm: function(req, res) {
		res.render('loginForm', { csrfToken: req.csrfToken(), google: googleTracking });
	},
	logout: function(req, res) {
		req.session.user = null;
		req.flash('success', 'You have been logged out');
		res.redirect('/');
	}
};
