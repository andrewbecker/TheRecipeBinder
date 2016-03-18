module.exports = function(sequelize, DataTypes) {
	return sequelize.define('review', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		comment: {
			type: DataTypes.TEXT
		},
		approved: {
			type: DataTypes.BOOLEAN,
			default: false
		}
	});
};