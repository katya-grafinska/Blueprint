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

})(jQuery, window, document);