$(function(){
	var slideshow = {
		total_width: $('.slider ul').width(),
		total_slides: $('.slider_slide').length,
		slider_width: $('.slider').width(),
		slide_width: $('.slider_slide').width(),
		moves_before_reset: 0
	};	

	// console.log('Slider total width: ' + slideshow.total_width + 'px');
	// //2200
	// console.log('Pics: ' + slideshow.total_slides + 'px');
	// //4
	// console.log('Width: ' + slideshow.slider_width + 'px');
	// //1170
	// console.log('Slide width: ' + slideshow.slide_width + 'px');

	var totalMove = slideshow.total_width - slideshow.slider_width;
	// console.log('Total move: ' + totalMove + 'px');

	slideshow.moves_before_reset = Math.ceil(totalMove / slideshow.slide_width);

	// console.log('Moves before reset: ' + slideshow.moves_before_reset);

	/*****  Meat and Potatoes  *****/

	function moveSlider(length, slider) {
		slider.animate({left: length}, "slow");
	}

	function debug() {
		$('.slider_total_width').html("Total slider width: " + slideshow.total_width);
		$('.total_slides').html("Total number of slides: " + slideshow.total_slides);
		$('.slider_width').html("Slider visible width: " + slideshow.slider_width);
		$('.slide_width').html("Slide width: " + slideshow.slide_width);
		$('.moves_before_reset').html("Moves before reset: " + slideshow.moves_before_reset);
		//$('.total_move').html("Total Move: " + total_move);
		$('.difference_slide_to_window').html("Difference: " + (slideshow.total_width - slideshow.slider_width));
		// console.log('Slider total width: ' + slideshow.total_width + 'px');
		// console.log('Pics: ' + slideshow.total_slides + 'px');
		// console.log('Width: ' + slideshow.slider_width + 'px');
		// console.log('Slide width: ' + slideshow.slide_width + 'px');
		// console.log('Total - Slider: ' + (slideshow.total_width - slideshow.slider_width));
	}

	var $slider = $('.slider ul');

	var moveLength = slideshow.slide_width;
	var moveNum = 1

	var calculateSliderInfo = setInterval(function() {
		slideshow.total_width = $('.slider ul').width();
		slideshow.slider_width = $('.slider').width();
		totalMove = slideshow.total_width - slideshow.slider_width;
		slideshow.moves_before_reset = Math.ceil(totalMove / slideshow.slide_width);
	}, 500);

	var outputStats = setInterval(function() {
		debug();
	}, 500);

	var slideAdvance = setInterval(function() {
		var move = moveLength * moveNum;

		if (moveNum > slideshow.moves_before_reset) {
			moveNum = 0;
			move = moveLength * moveNum;
		} else if (move > (slideshow.total_width - slideshow.slider_width)) {
			move = (slideshow.total_width - slideshow.slider_width);
		}

		moveSlider(-move, $slider);
		moveNum += 1;

	}, 4000);

});	