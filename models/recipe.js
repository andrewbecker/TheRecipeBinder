module.exports = function(sequelize, DataTypes) {
	return sequelize.define('recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			defaultValue: ''
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
			allowNull: false,
			defaultValue: 0
		},
		cook_time: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		image: {
			type: DataTypes.STRING
		}
	});
};