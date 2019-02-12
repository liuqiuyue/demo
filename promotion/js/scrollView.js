(function (w, $) {
    w.sv={};
    var winH = $(window).height(), //获取窗口高度
        domA = [],
        resizeTimer = null;

    var isShow = function ($el, adValue) {
        var scrollH = $(window).scrollTop(), //获取窗口滚动高度
            elTop = $el.offset().top,
            adj = adValue || 0; //获取元素距离窗口顶部偏移高度
        if (elTop - adj < scrollH + winH) {
            return true; //在可视范围
        } else {
            return false;  //不在可视范围
        }
    };
    var setShowAnimation = function ($el, className) {
        $el.each(function () {
            if (isShow($(this)) && !$(this).hasClass(className)) {
                // if (isShow($(this))) {
                $(this).addClass(className);
            }
        });
    };
    var animationCollect = function (domA) {
        for (var i = 0; i < domA.length; i++) {
            setShowAnimation($(domA[i]), domA[i].slice(3));
        }
    };
    var bgFixed = function ($el) {
        var docViewH = $(window).height() || winH;
        var scrollH = $(window).scrollTop(),
            elTop = $el.offset().top,
            elH = $el.height(),
            elHPer = elH / docViewH * 100;
        if (elTop > scrollH && elTop < scrollH + elH) {
            $el.css({
                "background-attachment": "scroll",
                "background-size": "100% 100%"
            });
        } else {
            $el.css({
                "background-attachment": "fixed",
                "background-size": "100%" + "" + elHPer + "%"
            });
        }
    };
    var resizeBg = function ($el) {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function () {
            bgFixed($el);
        }, 400);
    };
    w.sv.isShow = isShow;
    w.sv.resizeBg = resizeBg;
    w.sv.animationCollect=animationCollect;
    w.sv.bgFixed=bgFixed;
    w.sv.resizeBg= resizeBg;
})(window, jQuery);