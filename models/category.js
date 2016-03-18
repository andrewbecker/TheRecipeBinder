module.exports = function(sequelize, DataTypes) {
	return sequelize.define('category', {
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};