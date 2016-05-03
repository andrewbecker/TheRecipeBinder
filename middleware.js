var cryptojs = require('crypto-js');

module.exports = function (db) {

	return {
		requireAuthentication: function (req, res, next) {
			console.log("*** IN requireAuthentication ***");
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
				res.render('error', {message: 'User must be logged in', csrfToken: req.csrfToken()});
			});
		}
	};

};