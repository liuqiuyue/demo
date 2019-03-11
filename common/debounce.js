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
myDebounce(funcA);