var url = "http://www.taobao.com/index.php?key0=0&key1=1&key2=2";
function parseQueryString(url){
    var str = url.split("?")[1],    //通过?得到一个数组,取?后面的参数
        items = str.split("&");    //分割成数组
    var arr,name,value;

    for(var i=0; i<items.length; i++){
        arr = items[i].split("=");    //["key0", "0"]
        name = arr[0];
        value = arr[1];
        this[name] = value;
    }
}

var obj = new parseQueryString(url);
alert(obj.key2)
// url拿参数