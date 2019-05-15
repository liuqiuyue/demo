/**
 * @name DateSelect
 * @requires jquery,select,template
 * @constructor DateSelect
 * @param {Object} config 组件配置
 * @example 示例文档
 * @description 描述
 */

;
void
function () {
    var DateSelect = function (config) {
        var defaults = {
            wrap: ".J-date-wrap",
            defYear: null, //默认年
            defMonth: null, //默认月
            defDay: null, //默认日
            minYear: 1980, //最小年
            maxYear: (new Date().getFullYear()) + 1, //最大年
            template: '#J-tmpl',
            i18n: {
                monthShortVal: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            }
        };
        this.config = $.extend(true, {}, defaults, config);
        return this.init() || this;
    }

    DateSelect.prototype = {
        constructor: DateSelect,
        init() {
            var currentDate = new Date(),
                iMonth = this.config.defMonth ? parseInt(this.config.defMonth) : 0,
                iDay = this.config.defDay ? parseInt(this.config.defDay) : 0,
                iMinYear = parseInt(this.config.minYear),
                iMaxYear = parseInt(this.config.maxYear);
            this.year = (this.config.defYear ? parseInt(this.config.defYear) : 0) || currentDate.getFullYear();
            this.month = 1 <= iMonth && iMonth <= 12 ? iMonth : currentDate.getMonth() + 1;
            this.day = iDay > 0 ? currentDate.getDate() : iDay;
            this.minYear = iMinYear && iMinYear < this.year ? iMinYear : this.year;
            this.maxYear = iMaxYear && iMaxYear > this.year ? iMaxYear : this.year;
            this.$el = this._getDom();
            this.yearItem = this.$el.find('.J-year'),
                this.monthItem = this.$el.find('.J-month'),
                this.dayItem = this.$el.find('.J-day');
            $(this.config.wrap).html(this.$el);
            Select.use('.J-day,.J-month,.J-year');
            // setTimeout(() => {
            //     this.created();
            // }, 0);
            this._initEvent();
            return this;
        },
        _getDom() {
            var dateTmpl = template($(this.config.template).html());
            var el = dateTmpl({
                yearLength: parseInt(this.maxYear - this.minYear + 1),
                minYear: this.config.minYear,
                i18n: this.config.i18n,
                defYear: this.config.defYear ? parseInt(this.config.defYear) : 0,
                defMonth: this.config.defMonth ? parseInt(this.config.defMonth) : 0,
                defDay: this.config.defDay ? parseInt(this.config.defDay) : 0,
            });
            return $(el);
        },

        _setSelectControl(iLength, iIndex) {
            var oSelect = this.dayItem;
            var preLen = oSelect.children('option').length,
                curLen = Number(iLength) + 1;
            if (preLen > curLen) {
                {
                    for (var i = curLen; i < preLen + 1; i++) {
                        oSelect.children('option').eq(curLen).remove();
                    }
                }
                if (iIndex != 0) {
                    if (iIndex > curLen - 1) {
                        oSelect[0].selectedIndex = curLen - 1;
                    } else {
                        oSelect[0].selectedIndex = iIndex;
                    }
                }
            } else if (preLen < curLen) {
                {
                    for (var i = preLen; i < curLen; i++) {
                        oSelect.append("<option value='" + i + "'>" + i + "</option>");
                    }
                }
            }
            Select.unuse(".J-day");
            setTimeout(() => {
                Select.use(".J-day");
            }, 0);

        },
        _changeSelect() {
            var _this = this
            _this.yearItem.change(function () {
                _this.year = $(this).val();
                _this.monthItem.change();
            });
            _this.monthItem.change(function () {
                _this.month = $(this).val();
                var daysInMonth = new Date(_this.year, _this.month, 0).getDate();
                if (_this.day > daysInMonth) {
                    _this.day = daysInMonth;
                }
                _this._setSelectControl(daysInMonth, _this.day);
            });
            _this.dayItem.change(function () {
                _this.day = $(this).val();
            });
        },

        _initEvent() {
            this._changeSelect()
        }
    }

    // exports
    if (typeof define === "function") { // amd & cmd
        define(function () {
            return DateSelect;
        });
    } else if (typeof module !== "undefined" && "exports" in module) { // commonJS
        module.exports = DateSelect;
    } else { // global
        window.DateSelect = DateSelect;
    }
}.call(this);



