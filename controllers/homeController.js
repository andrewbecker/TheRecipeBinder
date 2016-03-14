module.exports = {
	index: function(req, res) {
		res.render('index', { 
			brand: 'Recipes',
			categories: ['Breakfast', 'Lunch', 'Dinner']
		});
	}
};