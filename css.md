####移动开发
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

####关于Safari appearance属性
-moz-appearance 

-webkit-appearance

[更多](https://developer.mozilla.org/en-US/docs/Web/CSS/-moz-appearance)

####关于click穿透
```css
 pointer-events: none;
 pointer-events: auto;
```

####关于线性渐变
```css
background: linear-gradient(90deg, #4F6F96,#6A98BA );
```

####关于遮挡文字省略号表示
```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

####关于文字换行
```css
word-wrap:break-word;
word-break:normal;
```

####关于动画
```css
@keyframes rainbow {
  from，to { transform: none; }
  50% { transform: scale(1.2); }
}

div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-fill-mode:forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}

div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}
```

####chrome自动填充背景色去除
```css
input:-webkit-autofill,
input:-webkit-autofill:active,
input:-webkit-autofill:focus,
input:-webkit-autofill:hover,
input:-webkit-autofill:visited {
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6), inset 0 0 0 50px white;
}
```

####打印分页
```css
@media print{
  .print-page{page-break-after:always;}
}
```


####关于垂直居中的几种方法
http://vanseodesign.com/css/vertical-centering/

1 
```css
#parent {display: table;}

#child {
    display: table-cell;
    vertical-align: middle;
}
```

2
```css
#child {
    line-height: 200px;
}
#parent {
    line-height: 200px;
}

#parent img {
    vertical-align: middle;
}
```

3
```css
#parent {position: relative;}

#child {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}
```
4
```css
#parent {position: relative;}

#child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 30%;
    margin: auto;
}
```
5
```css
#parent {
    padding: 5% 0;
}

#child {
    padding: 10% 0;
}
```

6
```html
<div id="parent">
    <div id="floater"></div>
    <div id="child">Content here</div>
</div>
```
```css
#parent {height: 250px;}

#floater {
    float: left;
    height: 50%;
    width: 100%;
    margin-bottom: -50px;
}

#child {
    clear: both;
    height: 100px;
}
```
