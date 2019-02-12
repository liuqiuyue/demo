/**
 * Created by chenghao on 2016/5/3.
 */
(function(w,$){
    var scrollHandler =function(){
        var fixedPosition = ($(window).scrollTop() || document.documentElement.scrollTop || document.body.scrollTop || 0);
        if (fixedPosition > 500) {
            $(".J-fixed-login").show();
        }else{
            $(".J-fixed-login").hide();
        }
    }

    $(window).scroll(function(e){
        scrollHandler();
    });
    scrollHandler();

})(window,jQuery);