(function (w, $) {
    var $mask = $(".J-jump-mask"),
        $close = $(".J-jump-close");

    function openNew(show_div) {
        var sWidth = $(document.body).width();
        var sHeight = $(document.body).height();
        show_div.css("display", "block").addClass("layer-anim-07");
        // $mask.css("display", "block").addClass("mask-special");
        $mask.css("display", "block");
        $mask.bind("click", function () {
            $mask.fadeOut();
            show_div.removeClass("layer-anim-07").fadeOut();
        });
        $close.bind("click", function () {
            $mask.fadeOut();
            show_div.removeClass("layer-anim-07").fadeOut();
        });
    }
    $(".J-jump-btn").each(function (index) {

        $(this).bind("click", function () {
            var a = $(".J-jump-w").eq(index);
            openNew(a);
            return false;
        });
    });
    var domA = [".J-fade-in-up"];
    sv.animationCollect(domA);
    $(window).scroll(function () {
        sv.animationCollect(domA);
    });

})(window, jQuery);