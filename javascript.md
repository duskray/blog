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
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
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