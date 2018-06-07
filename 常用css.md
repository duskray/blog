```css
// 字体通用
body {
    margin: 0;
    min-width: 1200px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #FFF8EC;
    font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

// 关于遮挡文字省略号表示
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

// 强制不换行
white-space: nowrap;

// 自动换行
word-wrap: break-word; 
word-break: normal; 

// 英文单词断行
word-break: break-all;

// 保留空白符序列与换行符
white-space: pre-wrap;

// 省略号处理
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;

// 固定行数
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;

// 移动设备上是否使用滚动回弹效果
-webkit-overflow-scrolling: auto/touch

// click穿透
pointer-events: none;
pointer-events: auto;

// 关于ios字体渲染
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;

// Chrome移动端及Safari上的渐变bug
// 表头整体渐变背景会被渲染为单个th减半 
// 临时解决方案
table {
      background: repeating-linear-gradient(...)
}
table tbody tr {
  background:white;
}

// disable-3d-touch
.disable-3d-touch {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}

```