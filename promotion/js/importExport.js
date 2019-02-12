 (function (w, $) {
    var domA = [".J-fade-in-up",
        ".J-fade-in-up-backwards",
        ".J-fade-in-special",
        ".J-width-grow",
        ".J-num-scroll",
        ".J-num-scroll-small"
    ];
    sv.animationCollect(domA);
    $(window).scroll(function () {
        sv.animationCollect(domA);
    });
})(window, jQuery);