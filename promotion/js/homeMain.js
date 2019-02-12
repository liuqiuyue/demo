 
 (function (w, $) {
	var domA = [".J-fade-in-up",
		".J-fade-in-up-big",
		".J-in-up"
	];
	var hasloadMedia = false;
	var $sectionItem = $(".J-section-three");
	function loadMedia($cur) {
		var src = $cur.attr('data-original'),
			sourceDom = $("<source  type='video/mp4' src=\"" + src + "\">");
		if (sv.isShow($cur, 200) && !hasloadMedia) {
			$cur.append(sourceDom);
			hasloadMedia = true;
		}
	}
	loadMedia($(".J-video-show-bottom"));
	//control video's play or pause For Chrome;
	// var setVideo = function () {
	// 	$(".J-video-show").each(function () {
	// 		var playPromise = $(this)[0].play();
	// 		// var isPlaying = $(this)[0].currentTime > 0 && !$(this)[0].paused && !$(this)[0].ended && $(this)[0].readyState > 2;
	// 		var elH = $(this).height(),
	// 			elTop = $(this).offset().top,
	// 			scrollH = $(window).scrollTop();
	// 		var _that = $(this);
	// 		if (isShow($(this), 200) && scrollH < elTop + elH) {
	// 			$(this)[0].play();

	// 		} else if (playPromise !== undefined) {
	// 			playPromise.then(function(){  
	// 				// Automatic playback started!
	// 				// Show playing UI.
	// 				// We can now safely pause video...
	// 				_that[0].pause();
	// 			});
	// 			// .catch(error => {
	// 			//   // Auto-play was prevented
	// 			//   // Show paused UI.
	// 			// });
	// 		}
	// 	});
	// };
	// setVideo();
	sv.animationCollect(domA);
	$(window).scroll(function () {
		sv.animationCollect(domA);
		sv.bgFixed($sectionItem);
		// setTimeout(setVideo, 400);
		//防止play()后立即执行pause()
		// setVideo();
		loadMedia($(".J-video-show-bottom"));
	});
	$(window).bind('resize', sv.resizeBg($sectionItem));
})(window, jQuery);      
 