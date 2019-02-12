//获取select国家码
var getCountryCode = function (option) {
    $(".J-hide-selectCountryCode").val(option.countryid);
    $(".J-prephone").text("+" + option.countrycode)
    initCountryItem(option.countryid);
    getAddProvinceList(option.value);
}
if ($('.J-selectCountryCode')[0]) {
    Select.use(".J-selectCountryCode")[0].on('change', function (option) {
        getCountryCode(option);
        getAddCityList('');
    });
};
$('.J-region-change-form').on('change', ".J-province-select-content", function (e) {
    var value = e.target.value;
    getAddCityList(value);

});
//所在国家对应相应条件变化
var initCountryItem = function (countrycode) {
    if (countrycode == '88461') {
        $('.J-EIN').show();
        $('.J-EIN .J-with-prompt-tip-input').removeClass('J-ignore');
    } else {
        $('.J-EIN').hide();
        $('.J-EIN .J-with-prompt-tip-input').addClass('J-ignore');
    }
    // 当Country是巴拿马、澳门、爱尔兰、香港、牙买加，邮编非必填。
    if (countrycode != '133221' && countrycode != '132941' && countrycode != '131541' && countrycode != '121991' && countrycode != '131641') {
        $('.J-must').show();
    } else {
        $('.J-must').hide();
    }
    // 当Country是xxx,港澳台 City必填。
    if (countrycode == '88461' || countrycode == '121991' || countrycode == '132941' || countrycode == '122201' || countrycode == '133061' || countrycode == '89251') {
        $('.J-city-must').show();
    } else {
        $('.J-city-must').hide();
    };
}
initCountryItem(countryRegionId);
//省份变化联动城市
/*
* province下拉
* */
var getAddProvinceList = function (value) {
    var tmplCity = template($(".J-province-template").html());
    var tmplCityHtml = '';
    var $regionId = $.trim($('.J-hide-selectCountryCode').val());
    $.ajax({
        url: 'citySelect',
        type: 'get',
        cache: false,
        data: {
            provinceId: value,
            excludeFlag: "1"
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 10000,
        success: function (response) {
            if (response && response.code === "10001") {
                tmplCityHtml = tmplCity({
                    data: response.data
                });
                $('.J-province-select').html(tmplCityHtml);
                if ($regionId == '121991' || $regionId == '132941' || $regionId == '122201') {
                    var _selectVal = $('.J-province-select-content option:eq(1)').val();
                    Select.use('.J-province-select-content')[0].val(_selectVal);
                    getAddCityList($('.J-province-select-content option:eq(1)').val());
                }
            } else {
                tmplCityHtml = ' <select name="provinceId" class="J-province-select-content"  select-css="" data-name="provinceId"><option value="">Please select State/Province/Region</option></select>';
                $('.J-province-select').html(tmplCityHtml);
            }
        },
        error: function () {
            alert(SILK.ASYNC_ERROR);
        },
        complete: function () {
            Select.use('select');
        }
    })
};
//若国家=港澳台，必选。下拉框显示当前省份的一级城市。
var getAddCityList = function (value) {
    var $regionId = $.trim($('.J-hide-selectCountryCode').val());
    if ($regionId === '121991' || $regionId === '132941' || $regionId === '122201' || $regionId === '133061' || $regionId === '89251') {
        $('.J-city-select').html('<select name="cityId"  select-css="" data-name="cityId"><option value="">Please select City</option></select>');
        if (value === '') {
            Select.use('select');
            return false;
        }
        var tmplCity = template($(".J-city-template").html());
        var tmplCityHtml = "";
        $.ajax({
            url: 'citySelect',
            type: 'get',
            cache: false,
            data: {
                provinceId: value,
                excludeFlag: "1"
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 10000,
            success: function (response) {
                if (response && response.code === "10001") {
                    tmplCityHtml = tmplCity({
                        data: response.data
                    });
                    $('.J-city-select').html(tmplCityHtml);
                }
            },
            error: function () {},
            complete: function () {
                Select.use('select');
            }
        });
    } else {
        if (!$('.J-city-select').find('input[name=city]')[0]) {
            $('.J-city-select').html('<input type="text" class="input-text" name="city" data-name="city" maxlength="100">');
        }
    }
};

//港澳台默认选择第一项并获取城市列表
if (!$(".J-selectCountryCode")[0]) {
    if (countryRegionId == '121991' || countryRegionId == '132941' || countryRegionId == '122201') {
        getAddCityList($('.J-province-select-content option:eq(1)').val());
    }
}