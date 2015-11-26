####数组删除元素
```js
var array = [2, 5, 9];
var index = array.indexOf(5);
if (index > -1) {
    array.splice(index, 1);
}
```

####isEmpty
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