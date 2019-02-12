(function (w, $) {
    var domA = [".J-fade-in-up",
        ".J-in-up"
    ];
    sv.animationCollect(domA);
    $(window).scroll(function () {
        sv.animationCollect(domA);
    });
})(window, jQuery);