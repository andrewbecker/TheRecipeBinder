module.exports = function(sequelize, DataTypes) {
	return sequelize.define('recipe', {
		title: {
			type: DataTypes.STRING
			
		},
		description: {
			type: DataTypes.TEXT
		},
		ingredients: {
			type: DataTypes.TEXT
		},
		instructions: {
			type: DataTypes.TEXT
		},
		yield: {
			type: DataTypes.STRING
		},
		prep_time: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		cook_time: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING
		}
	});
};