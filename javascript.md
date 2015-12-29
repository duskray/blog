####数组删除元素
```js
var array = [2, 5, 9];
var index = array.indexOf(5);
if (index > -1) {
    array.splice(index, 1);
}
```

####通用isEmpty
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
```
Examples:
```js
isEmpty(""), // true
isEmpty([]), // true
isEmpty({}), // true
isEmpty({length: 0, custom_property: []}), // true

isEmpty("Hello"), // false
isEmpty([1,2,3]), // false
isEmpty({test: 1}), // false
isEmpty({length: 3, custom_property: [1,2,3]}) // false
```

####支持拼音 select2+simple-pinyin
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

####设备判断
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