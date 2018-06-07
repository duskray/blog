
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
```