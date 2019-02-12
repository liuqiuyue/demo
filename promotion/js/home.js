/**
 * Created by qiankun on 2015/6/9.
 */
;
void function () {
    window.slide = new Slider({
        autoPlay: true,
        naturalOrder: 0,
        interval: 4000,
        speed: 750,
        animationType: 'scrollX',
        bannerEventType: 'mouseover',
        carrier: {
            content: ".J-slider .J-content",
            banner: ".J-slider .J-control"
        },
        extend: {
            linkDom: function (conf, sliderMember) {
                var content = conf.carrier.content, banner = conf.carrier.banner;
                if (!(content && $(content).length > 0 && banner && $(banner).length > 0)) {
                    return;
                }
                var members = [];
                var sliderObjs = $(content).children("li");
                var bannerObjs = $(banner).children("li");
                $.each(sliderObjs, function (i, n) {
                    var sMember = new sliderMember();
                    sMember.sliderObj = $(n);
                    if (members.length == 0) {
                        $(banner).html("");
                    }
                    var bannerBtn = $("<li></li>");
                    $(banner).append(bannerBtn);
                    sMember.bannerObj = bannerBtn;
                    members.push(sMember);
                });
                return members;
            }
        }
    });
}.call(this);