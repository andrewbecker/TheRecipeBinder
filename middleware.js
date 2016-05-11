var cryptojs = require('crypto-js');

module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) {
			var token = req.session.auth || '';

			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (user) {
				req.user = user.toPublicJSON();
				next();
			}).catch(function () {
				req.flash('error', 'You must be logged in to view this page');
				res.redirect('/');
			});
		},
		isAdmin: function(req, res, next) {
			var user = req.session.user;
			if (user.isAdmin) {
				next();
			} else {
				req.flash('error', 'You do not have access to this page');
				res.redirect('/');
			}
		}
	};

};