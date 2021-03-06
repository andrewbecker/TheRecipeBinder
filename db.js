var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
		dialect: 'mysql'
	});
} else {
	// sequelize = new Sequelize(undefined, undefined, undefined, {
	// 	'dialect': 'sqlite',
	// 	'storage': __dirname + '/data/dev-ryan-recipe.sqlite'
	// });
	sequelize = new Sequelize('ryan_recipes', 'root', 'my_password', {
		dialect: 'mysql'
	});
}



var db = {};

db.recipe = sequelize.import(__dirname + '/models/recipe.js');
db.review = sequelize.import(__dirname + '/models/review.js');
db.category = sequelize.import(__dirname + '/models/category.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.review.belongsTo(db.recipe);
db.recipe.hasMany(db.review);

db.recipe.belongsTo(db.user);
db.user.hasMany(db.recipe);

//db.recipe.belongsToMany (db.category, {as: 'category', through: 'RecipeCategory' });
//db.category.belongsToMany (db.recipe, {as: 'recipe', through: 'RecipeCategory' });

db.category.hasMany(db.recipe);


module.exports = db;