var recipe = {
	title: 'Apple Pie',
	ingredients: ['Apples', 'Pie crust', 'Cinnamon', 'Apples', 'Pie crust', 'Water', 'Sugar', 'Pans'],
	instructions: [
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, iusto aliquid quod veniam, eius nobis odio dicta, unde dolorum voluptatem facere quisquam assumenda quas nisi! Cupiditate sit aspernatur labore debitis.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, iusto aliquid quod veniam, eius nobis odio dicta, unde dolorum voluptatem facere quisquam assumenda quas nisi! Cupiditate sit aspernatur labore debitis.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, iusto aliquid quod veniam, eius nobis odio dicta, unde dolorum voluptatem facere quisquam assumenda quas nisi! Cupiditate sit aspernatur labore debitis.',
	],
	image: {
		src: '/images/apple_pie.jpg',
		description: 'Apple Pie'
	}
};

var review = [
	{
		name: 'Andy Becker',
		comment: 'I enjoyed this recipe'
	},
	{
		name: 'John Smith',
		comment: 'Tasty'
	}
];

var categories = ['Breakfast', 'Lunch', 'Dinner'];

module.exports = {
	findOne: function(req, res) {
		res.render('recipe', { recipe: recipe, review: review, categories: categories });
	}
};