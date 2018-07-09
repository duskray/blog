
```js
// back to top
function toTop() {
  if ($.browser.safari) {
    $("body").animate({ scrollTop: 0 }, 300, 'swing', function () {

    })
  } else {
    $("html, body").animate({ scrollTop: 0 }, 300, 'swing', function () {

    })
  }
}

// 关于设置display破坏transition
$('.notice').css({ display: 'block'})
$('.notice').css('display')  // <=
$('.notice').css({
  top: 'calc(50vh - 60px)',
  opacity: 1,
})

// 获取页面高度 即使存在滚动条 跨平台
function getheight(){
    var d= document.documentElement;
    var b= document.body;
    var who= d.offsetHeight? d: b ;
    return Math.max(who.scrollHeight,who.offsetHeight);
}

// 获取滚动条宽度
export const getScrollbarWidth = () => {
    let d = document.documentElement;
    let b = document.body;
    let who = d.offsetHeight ? d : b;
    const hasScroll = who.scrollHeight > who.clientHeight
    if (!hasScroll) {
      return 0
    }
    
    let outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    let inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

// 获取页面高度
function getBodyHeight() {
  var body = document.body,
    html = document.documentElement;

  return Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);
}

// 获取滚动条top
function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

```

