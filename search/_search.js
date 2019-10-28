$(function () {
    var forms = $('form[name=searchForm]');

    if (forms.length > 0) {
        forms.each(function (index, item) {
            (function (_form) {
                searchFormInit(_form);
            }(item));
        });
    }

    function searchFormInit(form) {
        var word = form.keyword;
        //<!-- Search Form -->

        $(form).bind('submit', function (e) {
            // 自定义搜索按钮跳转 (input输入框如果存在该属性并且为空则忽略为空判断，直接跳转)
            if ($(word).attr('data-customLink') && $.trim(word.value) === '') {
                window.location.href = $(word).attr('data-customLink');
                e.preventDefault();
                return false;
            }

            if ($.trim(word.value) === '') {
                window.location.reload();
                e.preventDefault();
                return false;
            }

            /*if (!/^[\x00-\x7F\xB0]*$/.test(word.value)) {
                alert('Please input your information in English.');
                e.preventDefault();
                return false;
            }*/
        });
        function createSubmitArgs(name, value) {
            var _input = document.createElement('input');

            _input.type = 'hidden';
            _input.name = name;
            _input.value = value;
            form.appendChild(_input);
        }

        function initArgsInputHidden(wrap, name, value) {
            if ($(wrap).find('input[name=' + name + ']').length > 0) {
                $(wrap).find('input[name=' + name + ']').remove();
            }

            $(wrap).append('<input type="hidden" name="' + name + '" value="' + value + '"/>');
        }

        var searchInput = function ($this) {
            if ($this.val() !== '') {
                $('.J-header-search-clear').addClass('active');
            } else {
                $('.J-header-search-clear').removeClass('active');
            }
        };

        $('.J-header-search-input').on('keyup', function () {
            searchInput($(this));
        }).on('focus', function () {
            searchInput($(this));
        });
    }
});
$(function () {
    /*
     * 搜索联想词
     */
    function IndexData(data) {
        if (!data) return;
        var i = 0;

        try {
            for (var template in data) {
                if (data[template] && data[template].length > 0) {
                    for (i = 0; i < data[template].length; i++) {
                        data[template][i]['_index'] = i;
                    }
                }
            }
        } catch (e) {
            window.console && console.log('init index error');
        }
    }
    /**
     * 执行模板js代码
     * @param data
     * @param str
     */
    function resolveTemplate(data, str) {
        var code = '',
            r_block = /<\$([\w\W]*?)\$>/gi,
            result = null,
            attr = null,
            transCode,
            tmpStr = str;

        for (attr in data) {
            transCode = data[attr];
            if (typeof transCode === 'string' && (transCode.indexOf('"') !== -1 || transCode.indexOf("'") !== -1)) {
                transCode = transCode.replace(/"/g, '\\"');
                transCode = transCode.replace(/'/g, "\'");
            }
            code += 'var ' + attr + '="' + transCode + '";';
        }
        while ((result = r_block.exec(str)) !== null) {
            var execCode = code;

            execCode += result[1];
            try {
                tmpStr = tmpStr.replace(result[0], new Function(execCode)() || '');
            } catch (e) {
                return '';
            }
        }
        return tmpStr;
    }

    function html2Elem(html) {
        var tmp = document.createElement('div');

        tmp.innerHTML = html;
        return tmp.childNodes[0];
    }

    /**
     * 转化模板为HTML
     * @param {Object} data
     * @param {String} keyword
     * @return {DocumentFragment}
     */
    function convertTemplates(data, keyword) {
        var _template = '<a href="javascript:;" val="<$ return word.replace(/"/g, "&quot;"); $>" J-code="{catCode}">{{word}}</a>';
        var template, item, i, l, t, node;
        var docfrag = document.createDocumentFragment();
        var list = '',
            highlightCls = 'bold';

        for (template in data) {
            if (data[template] && _template) {
                for (i = 0, l = data[template].length; i < l; i++) {
                    list = resolveTemplate(data[template][i], _template);
                    for (item in data[template][i]) {
                        list = list.replace(new RegExp('{' + item + '}', 'gi'), data[template][i][item]);
                    }
                    if (highlightCls) {
                        list = list.replace(new RegExp('({.+})', 'gi'), function ($1) {
                            $1 = $1.substring(1, $1.length - 1);
                            return $1.replace(new RegExp(keyword, 'gi'), createReplacer("$&", highlightCls));
                        });
                    }
                    node = html2Elem(list);
                    node.setAttribute('template', template);
                    docfrag.appendChild(node);
                }
            }
        }
        return docfrag;
    }

    function createReplacer(keyword, highlightCls) {
        return '<span class="' + highlightCls + '">' + keyword + '</span>';
    }
    //节流
    function _debounce() {
        var _timer = null;

        return function (func) {
            if (_timer) {
                clearTimeout(_timer);
                _timer = null;
            }
            _timer = setTimeout(function () {
                func();
            }, 300);
        }
    }
    var myDebounce = _debounce();
    var url = '';

    function isUaPhone() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function searchWords() {
        url = 'xxx.codSuggest.do?param=#param#&kind=5&ad=1&id=CROVSearchSuggest&count=10&ignoreCase=true&matchAnywhere=true&catflag=0&call=?';
        url += '&_' + new Date().getTime();
        $.ajax({
            type: 'get',
            url: url.replace('#param#', encodeURIComponent($(".J-header-search-input").val())),
            dataType: 'json',
            success: function (data) {
                $(".dropmenu-list").empty();
                IndexData(data);
                if (data['sug'] && data['sug'].length > 0) {
                    $(".dropmenu-list").append(convertTemplates(data, $(".J-header-search-input").val()));
                    //处理后端对于同一关键词不同类目时，显示多个相同词
                    $(".dropmenu-list a").each(function () {
                        if ($(this).text() == $(this).prev().text()) {
                            $(this).remove();
                        }
                    });
                    $(".dropmenu-list").prepend('<a style="display:none" class="hover" href="">'+$(".J-header-search-input").val()+'</a> ');
                    changeCoords();
                    $(".dropmenu-list").show();
                    //鼠标移动事件
                    $(".dropmenu-list a").hover(function () {
                        $(".dropmenu-list a").removeClass("hover");
                        $(this).addClass("hover");
                    });
                } else {
                    clearThinkWord();
                }
            },
            error: function () {
                clearThinkWord();
            }
        });
    }
    $(".J-header-search-input").on({
        "keyup": function (evt) {
            if (!$(".dropmenu-list")[0]) {
                $(".header-search-box").append('<div class="dropmenu-list"></div>');
            }
            var k = window.event ? evt.keyCode : evt.which;

            if (k == 13) {
                myDebounce(searchWords);
                return true;
            } 
            //不为空 && 不为上箭头或下箭头或回车或者左右键
            if ($(".J-header-search-input").val() != "" && k != 38 && k != 40 && k != 13&& k != 37&& k != 39) {
                myDebounce(searchWords);
            } else if (k == 38) { //上箭头
                $(".dropmenu-list a.hover").prev().addClass("hover");
                $(".dropmenu-list a.hover").next().removeClass("hover");
                $('.J-header-search-input').val($('.dropmenu-list a.hover').text());
            } else if (k == 40) { //下箭头
                $(".dropmenu-list a.hover").next().addClass("hover");
                $(".dropmenu-list a.hover").prev().removeClass("hover");
                $('.J-header-search-input').val($('.dropmenu-list a.hover').text());
            } else if (k == 13) { //回车
                form.submit();
                clearThinkWord();
            }else  if (k == 37||k == 39) { //左右键
                return true;
            } else {
                clearThinkWord();
            }
        },
        "focus": function (e) {
            if($('.J-header-search-input').val() !== ''){
                myDebounce(searchWords);
            }
        }

    });

    if (('ontouchend' in document) && isUaPhone()) {
        $(".J-header-search-input").on({
            "touchend": function (e) {
                if ($(".dropmenu-list a").length > 0) {
                    changeCoords();
                    $(".dropmenu-list").show();
                };
            }
        });
        $("body").on("touchstart", function (e) {
            $('.dropmenu-list').hide();
        });
    } else {
        $(".J-header-search-input").on({
            "click": function (e) {
                e.stopPropagation();
                return false;
            },
            "blur": function (e) {
                clearThinkWord();
            }
        });
       
    };
    var sy = 0;

    if ($('.J-header-search-input')[0]) {
        var form = $('.header-search-box');
        var startx, starty, endx, endy;

        $(".header-search-box").append('<div class="dropmenu-list"></div>');
        $(".dropmenu-list").hide();
        changeCoords(); //控制查询结果div坐标
        $(".dropmenu-list").on('mousedown', function (e) {
            e.preventDefault();
        }).on('click', 'a', function () {
            $(".J-header-search-input").val(this.getAttribute('val'));
            form.submit();
            clearThinkWord();
        }).on("touchstart", 'a', function (e) {
            var touch = e.originalEvent.targetTouches[0];

            sy = touch.pageY;
            startx = touch.pageX;
            starty = touch.pageY;
            endx = startx;
            endy = starty;
            e.stopPropagation();
        }).on("touchmove", 'a', function (e) {
            var touch = e.originalEvent.targetTouches[0];

            endx = touch.pageX;
            endy = touch.pageY;
            e.stopPropagation();
            //ios移动端滑动问题解决
            var down = (touch.pageY - sy > 0);
            //top

            if (down && this.parentNode.scrollTop <= 0) {
                e.preventDefault();
            }
            //bottom
            if (!down && this.parentNode.scrollTop >= this.parentNode.scrollHeight - this.parentNode.clientHeight) {
                e.preventDefault();
            }
        }).on("touchend", 'a', function (e) {
            e.stopPropagation();
            var x = endx - startx;
            var y = endy - starty;
            var W = x < 0 ? x * -1 : x; //x轴的滑动值, w为x的绝对值
            var H = y < 0 ? y * -1 : y; //y轴的滑动值

            if (W < 5 && H < 5) {
                e.preventDefault();
                $(".J-header-search-input").val(this.getAttribute('val'));
                form.submit();
                clearThinkWord();
            }
        });
    }
    //解决页头滚动时影响
    $(window).on('scroll', function() {
        if($('.J-header-search-input')[0]&&$(".dropmenu-list").css('display')=="block"){
            if($('.J-header-wrap').hasClass('scroll-out')||($('.J-header-wrap').hasClass('fixed')&&!$('.J-header-wrap').hasClass('scroll-in'))){
                $(".dropmenu-list").hide();
                $(".J-header-search-input").blur();
            }
        }
    }); 

    $(window).on('resize', function () {
        changeCoords();
    })
    //清空联想词
    function clearThinkWord() {
        $(".dropmenu-list").empty();
        $(".dropmenu-list").hide();
    }
    //设置查询结果div坐标
    function changeCoords() {
        $('.dropmenu-list').css({
            "width": $(".J-header-search-input").innerWidth(),
            "left": $(".header-search-box").css("padding-left"),
        });
    }
    //中文字符提示
    $(form).bind('submit', function (e) {
        if (!/^[\x00-\x7F]*$/.test($('.J-header-search-input').val())) {
            alert('Please input the information in English only.');
            e.preventDefault();
            return false;
        }
    });
    $('.J-header-search-clear').on('click', function () {
        $('.J-header-search-input').val('');
        $(this).removeClass('active');
        clearThinkWord();
    })
});