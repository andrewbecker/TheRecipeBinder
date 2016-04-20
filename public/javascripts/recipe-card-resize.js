$(function(){

	var heightArray = [];
	var maxHeight = 0;
	$('.recipe-card').each(function (i, obj) {
		heightArray.push($(this).height());
		// console.log($('.main-area').width());
		// if ($('.main-area').width() === 1140) {
		// 	var newWidth = $(this).width() - 14;
		// 	$(this).width(newWidth);
		// }
	});
	console.log("Array: " + heightArray);
	var maxHeight = (Math.max(...heightArray));

	$('.recipe-card').each(function () {
		$(this).height(maxHeight);
	});

});