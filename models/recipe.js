module.exports = function(sequelize, DataTypes) {
	var slugify = function(text) {
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')        // Replace spaces with -
			.replace(/[^\w\-]+/g, '')   // Remove all non-word chars
			.replace(/\-\-+/g, '-')      // Replace multiple - with single -
			.replace(/^-+/, '')          // Trim - from start of text
			.replace(/-+$/, '');         // Trim - from end of text
	}

	return sequelize.define('recipe', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
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
		},
		slug: {
			type: DataTypes.STRING
		}
	}, {
		hooks: {
			beforeCreate: function(user, options) {
				user.slug = slugify(user.title);
			},
			beforeUpdate: function(user, options) {
				user.slug = slugify(user.title);
			}
		}
	});
};