var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-ryan-recipe.sqlite'
	});
}



var db = {};

db.recipe = sequelize.import(__dirname + '/models/recipe.js');
db.review = sequelize.import(__dirname + '/models/review.js');
db.category = sequelize.import(__dirname + '/models/category.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.review.belongsTo(db.recipe);
db.recipe.hasMany(db.review);

db.recipe.belongsToMany (db.category, {as: 'category', through: 'RecipeCategory' });
db.category.belongsToMany (db.recipe, {as: 'recipe', through: 'RecipeCategory' });

module.exports = db;