// 千位分隔符


if (!window.util) {
    window.util = {};
}
// return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
util.thousandBitSeparator = function(num) {
    return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ",";
    }) : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, function($0, $1) {
      return $1 + ",";
    }))
};



util.thousandBitSeparatorOut = function(str){
    return Number(str.toString().replace(/,/g,''));
};