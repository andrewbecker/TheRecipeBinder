module.exports = function(sequelize, DataTypes) {
	return sequelize.define('recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
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
			type: DataTypes.INTEGER
		},
		cook_time: {
			type: DataTypes.INTEGER
		},
		image: {
			type: DataTypes.STRING
		}
	});
};