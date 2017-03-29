;(function($, window, document, undefined) {
	"use strict";
	
	/* VIDEO */
	$('.video').each(function(){
		var videoWrap = $(this),
		videoPopUp = videoWrap.find('.video-popup'),
		buttonPlay = videoWrap.find('.video__play-btn'),
		videoIframe = videoPopUp.find('iframe'),
		iframeSrc = videoIframe.attr('src'),
		iframeDataSrc = videoIframe.attr('data-src'),
		closePlayButton = videoPopUp.find('.close-btn');

		buttonPlay.on('click', function(e){
			e.preventDefault();
			videoPopUp.addClass('active');
			videoIframe.attr('src', iframeDataSrc);
		})

		closePlayButton.on('click', function(){
			videoPopUp.removeClass('active');
			videoIframe.attr('src', iframeSrc);
		});
	});

	/* SWIPER SLIDER */
	var swipers = {};
	var attrsToSize = {
		'data-md-slides' : '1200',
		'data-sm-slides' : '1023',
		'data-xs-slides' : '639'
	};

	function parseSlidesAttrValue(value) {
		var parts = value.split(',');
		return {
			slidesPerView: parseInt(parts[0],10),
			spaceBetween: parseInt(parts[1],10)
		}
	}

	function createBreakpoints(container, attrsToSize) {
		var breakpointsObj = {};
		$.each(attrsToSize, function(key ,value) {
			if (container.attr(key)) {
				breakpointsObj[value] = parseSlidesAttrValue(container.attr(key));
			}
		});

		return breakpointsObj;
	}

	$('.swiper-container').each(function(index){
		var $t = $(this);
		var sliderIndex = 'swiper-unique-id-'+ index;
		var thisButtonNext = '.swiper-button-next' + index;
		var thisButtonPrev = '.swiper-button-prev' + index;

		var isPostSlider = false;

		if ($t.hasClass('post-slider')) {
			$t.parent('.news-section').find('.swiper-button-next').addClass('swiper-button-next' + index);
			$t.parent('.news-section').find('.swiper-button-prev').addClass('swiper-button-prev' + index);
			isPostSlider = true;
		}
		else {
			$t.find('.swiper-button-next').addClass('swiper-button-next' + index);
			$t.find('.swiper-button-prev').addClass('swiper-button-prev' + index);
		}
		$t.find('.swiper-pagination').addClass('pagination-'+ sliderIndex);
		$t.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);

		var autoPlayVar = $t.attr('data-autoplay');
		var mode = $t.attr('data-mode');

		var loopVar = $t.attr('data-loop');
		var speedVar = parseInt($t.attr('data-speed'),10);
		var centerVar = $t.attr('data-center');
		var spaceBetweenVar = parseInt($t.attr('data-space-between'),10);
		var slideEffect = $t.attr('data-slide-effect');

		var slidesPerViewVar = parseInt($t.attr('data-slides-per-view'),10);
		if (isNaN(slidesPerViewVar)) {
			slidesPerViewVar = 'auto';
		}

		swipers[sliderIndex] = new Swiper('.' + sliderIndex,{
			loop: loopVar || false,
			autoplay: autoPlayVar || false,
			autoplayDisableOnInteraction: false,
			speed: speedVar || 300,
			slidesPerView: slidesPerViewVar || 1,
			spaceBetween: spaceBetweenVar,
			centeredSlides: centerVar || false,
			mode: mode || 'horizontal',
			grabCursor: true,
			keyboardControl: true,
			nextButton: thisButtonNext,
			prevButton: thisButtonPrev,
			breakpoints: createBreakpoints($t, attrsToSize),
			setWrapperSize: true,
			effect: slideEffect || 'slide'
		});
	});

})(jQuery, window, document);