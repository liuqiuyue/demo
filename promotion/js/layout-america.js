 (function (w, $) {
    var domA = [
        ".J-fade-in-up",
        ".J-fade-in-up-big",
        ".J-in-up"
    ];
    var $sectionItem = $(".J-section-four");
    sv.animationCollect(domA);
    // var itemFixed = function ($el) {
    //     var docViewH = $(window).height() || winH;
    //     var scrollH = $(window).scrollTop(),
    //         elTop = $el.offset().top,
    //         elH = $el.height(),
    //         elHPer = elH / docViewH * 100;
    //     if ( elTop > scrollH && elTop < scrollH + elH) {
    //         $el.css({
    //             "position": "fixed",
    //             "top": "100px",
    //             "left": "50%",
    //             "margin-left": "-203px"
    //         });
    //     } else {
    //         $el.css({
    //             "position": "static",
    //             "margin-left": "auto"
    //         });
    //     }
    // };
    // var hasShowed = false;
    // var preLoadMedia = function () {
    //     var $cur = $(".J-full-view-content");
    //     if (!hasShowed&&isShow($cur)) {
    //         $cur.attr('src', $cur.attr('data-original'));
    //         hasShowed=true;
    //     }
    // };
    var hasShowed = false;
    var preLoadMedia = function ($cur) {
        if (!hasShowed && sv.isShow($cur, 200)) {
            $cur.attr('src', $cur.attr('data-original'));
            hasShowed = true;
        }
    };
    preLoadMedia($(".J-full-view-content"));
    $(window).scroll(function () {
        sv.animationCollect(domA);
        sv.bgFixed($sectionItem);
        preLoadMedia($(".J-full-view-content"));
        // itemFixed($(".J-describe"));
    });
    $(window).bind('resize', sv.resizeBg($sectionItem));
})(window, jQuery);