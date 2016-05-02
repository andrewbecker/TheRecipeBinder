$(function(){

	var heightArray = [];
	var maxHeight = 0;
	var windowWidth = $('.main-area').outerWidth();

	$('.recipe-card').each(function (i, obj) {
		var imgHeight, titleHeight, descriptionHeight, totalHeight;
		imgHeight = $(this).find('img').innerHeight();
		titleHeight = $(this).find('h3').outerHeight();
		descriptionHeight = $(this).find('p').innerHeight();
		totalHeight = (imgHeight + titleHeight + descriptionHeight + 40);

		heightArray.push(totalHeight);
	});
	
	var maxHeight = (Math.max(...heightArray));

	$('.recipe-card').each(function () {
		$(this).height(maxHeight);
	});

	var checkWidth = setInterval(function(){
		var newWindowWidth = $('.main-area').outerWidth();
		if (newWindowWidth !== windowWidth) {
			windowWidth = newWindowWidth;
			heightArray = [];

			$('.recipe-card').each(function (i, obj) {
				var imgHeight, titleHeight, descriptionHeight, totalHeight;
				imgHeight = $(this).find('img').innerHeight();
				titleHeight = $(this).find('h3').outerHeight();
				descriptionHeight = $(this).find('p').innerHeight();
				totalHeight = (imgHeight + titleHeight + descriptionHeight + 40);



				heightArray.push(totalHeight);

			});

			var maxHeight = (Math.max(...heightArray));

			$('.recipe-card').each(function () {
				$(this).height(maxHeight);
			});
		};
	}, 250);

});