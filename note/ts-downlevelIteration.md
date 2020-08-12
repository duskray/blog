### 关于downlevelIteration

ES6允许使用如下方式遍历Map

```js
const someMap = new Map([
  [0, 'aaa'],
  [1, 'bbb'],
]);
[...someMap.keys()].map((item) => console.log(item));
[...someMap.values()].map((item) => console.log(item));
[...someMap.entries()].map((item) => console.log(item));
[...someMap].map((item) => console.log(item));
```

但ts对此会进行警告

*类型“Map\<number, string\>”不是数组类型或字符串类型。请使用编译器选项 "--downlevelIteration" 允许迭代器进行迭代*

开启downlevelIteration可以正常处理Map/Set，此外还需要es2015.iterable/es2015.collection

### 那么downlevelIteration具体做了什么呢

downlevelIteration引入自TypeScript 2.3，当target为ES5或ES3时，为可迭代对象提供全面支持。

除了支持Set/Map之外，还能更好的支持迭代器的编译，举个例子

```js
const text = "Booooom💥";

for (const char of text) {
  console.log(char);
}
```
在ES6环境下能够正常输出，包括emoji字符

然而，ts编译会生成如下代码

```js
"use strict";
var text = "Booooom💥";
for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
    var char = text_1[_i];
    console.log(char);
}
// output:
// B
// 5 o
// m
// �
// �
```
这会导致异常的结果

在索引循环中，emoji字符被当做为两个独立的字符进行了输出；而字符串的迭代器接口可以正确处理大于0xFFFF的码点

```js
const emoji = '\u{1f4a5}';
console.log(emoji.length);      // 2
console.log([...emoji].length); // 1
```

开启downlevelIteration后，就可以正常编译了
