###js相关
------------
####初始化
```js
$(function(){  
    //some code
});
```

####事件存在检测
```js
var btnExport = $('#id');
var events = $._data(btnExport[0],"events");
if(!events) {
   //some code
}
```

####Date对象相关
```
new Date(2000, 0, 1, 0, 0, 0)
getTime():  946656000000
toString():  Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)
toTimeString():  00:00:00 GMT+0800 (中国标准时间)
toDateString():  Sat Jan 01 2000
toUTCString():  Fri, 31 Dec 1999 16:00:00 GMT
toLocaleString():  2000/1/1 上午12:00:00
toLocaleString("zh-CN", {"hour12": false}):  2000/1/1 00:00:00 *
toLocaleTimeString():  上午12:00:00
toLocaleDateString():  2000/1/1
Date.UTC(2000, 0, 1, 0, 0, 0):  946688461000
```
\* toLocaleString()的[更多信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

####jQuery控件
```js
(function ($) {
	$.fn.somefunction = function(options) {
		...
	}
}(jQuery));
```
