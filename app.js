var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var _ = require('underscore');
var db = require('./db');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var methodOverride = require('method-override');
var rmdir = require('rimraf');
var fs = require('fs');

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

var doSync = true;

db.sequelize.sync({
	logging: console.log,
	force: doSync
}).then(function() {
	console.log('Sequelize synced!');
	if (doSync) {
		rmdir('./public/finalUpload', function(err) {
			if (err) { console.log(error) };

			if (!fs.existsSync('./public/finalUpload')) {
				fs.mkdirSync('./public/finalUpload');
			}
		});
		
	}
	// db.recipe.create({
	// 	title: 'Apple Pie',
	// 	description: 'A great pie for any day of the week!',
	// 	ingredients: 'Apple, Cinnamon, Sugar, Flour, Butter',
	// 	instructions: 'Step 1\nStep 2\nStep 3\nStep 4',
	// 	yield: '4 servings',
	// 	prep_time: 30,
	// 	cook_time: 45,
	// 	image: '/images/apple_pie.jpg',
	// }).then(function(recipe){
	// 	db.category.create({
	// 		category: 'Breakfast'
	// 	}).then(function(category){
	// 		recipe.addCategory(category);
	// 	});
	// });
	// db.review.create({
	// 	name: 'John Smith',
	// 	comment: 'Great food',
	// 	recipeId: 1
	// });
	// db.category.create({
	// 	category: 'Dinner'
	// });
});

module.exports = app;