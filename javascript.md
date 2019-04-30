#### isEmptyObj
```
const isEmptyObj = (obj) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}
```

#### 人力触发一个下载（？
```
const iframe = document.createElement('iframe')
iframe.src = d
iframe.style.display = 'none'
document.body.appendChild(iframe)
```

#### 使用 passive 改善的滚屏性能
```js
var elem = document.getElementById('elem'); 
elem.addEventListener('touchmove', function listener() { /* do something */ }, { passive: true });
```

#### 数组删除元素
```js
var array = [2, 5, 9];
var index = array.indexOf(5);
if (index > -1) {
    array.splice(index, 1);
}
```

#### 通用的isEmpty
```js
function isEmpty(obj) {
    if (obj === null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

isEmpty(""), // true
isEmpty([]), // true
isEmpty({}), // true
isEmpty({length: 0, custom_property: []}), // true

isEmpty("Hello"), // false
isEmpty([1,2,3]), // false
isEmpty({test: 1}), // false
isEmpty({length: 3, custom_property: [1,2,3]}) // false
```

#### 支持拼音 select2+simple-pinyin
```js
$.fn.select2.defaults.set("matcher", function(param, data) {
    var term = param.term;
    if (term) {
        var mod = simplePinyin(data.text);
        var termUpperCase = term.toUpperCase();
        var inFull = mod.full.toUpperCase().indexOf(termUpperCase) === 0;
        var inShort = mod.short.toUpperCase().indexOf(termUpperCase) >= 0;
        return (inFull || inShort) ? data : null;
    } else {
        return data;
    }
});

$(...).select2({
    language: 'zh-CN'
});
```

#### 设备判断
```js
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "phone";
    } else {
        return "pc";
    }
}
```

#### Date对象相关
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

#### 事件存在检测
```js
var btnExport = $('#id');
var events = $._data(btnExport[0],"events");
if(!events) {
   //some code
}
```

#### Html转义
```js
module.exports = function(str) {
  if (str == null) {
    return str;
  }

  if (typeof str !== "string") {
    str = String(str);
  }

  if (/[&<>\"\']/.test(String(str))) {
    return str
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/\'/g,'&apos;')
      .replace(/\"/g, '&quot;');
  }
  else {
    return str;
  }
}
```
