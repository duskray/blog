# 长度

## 计算值

- lh 表示元素 line-height 的计算值
  
- rlh 表示根元素 line-height 的计算值

配合em、rem可以更好的进行屏幕适配


## 高级测量(advance measure)

- ch 定义为数字0的宽度；如果无法确定“0”字形的大小，则假定其宽为0.5em，高为1em。

- ex 对于含有“X”字母的字体中，它表示该字体的小写字母x的高度，多数情况下 1ex ≈ 0.5em。

- ic 目前不支持，描述汉字”水“（U + 6C34）的高级测量尺寸。

不同于 em 这种明确的计算值，ch & ex & ic 描述的是字体字形的预测尺寸，对于不同字体其表现可能有差异。

## width值

- max-content 元素内容固有的合适宽度
  
- min-content 元素内容固有的最小宽度
  
- fit-content min(max-content, max(min-content, 可用宽度))

可在不使用inline-block的情况下根据内容设置block的宽度

[大致是这么个效果](https://codepen.io/duskray/pen/vYGBKjJ)

# 颜色

## 色彩关键字 

如今，[CSS Color Module Level 4](https://drafts.csswg.org/css-color/)已支持大量的具名颜色，远超css1的16个基本色。

## transparent

transparent 表示一个完全透明的颜色，实现上使用的是 rgba(0,0,0,0)。

## currentColor

currentColor 表示继承后 color 属性的计算值；在svg中可以继承css设置以动态设置图形颜色。

## rgb() rgba()

使用[RGB立体坐标](https://upload.wikimedia.org/wikipedia/commons/0/05/RGB_Cube_Show_lowgamma_cutout_a.png)（红-绿-蓝-阿尔法通道）描述一个颜色

## hsl() hsla()

使用[HSL圆柱坐标](https://upload.wikimedia.org/wikipedia/commons/3/33/HSV_color_solid_cylinder_saturation_gray.png)（色相-饱和度-亮度-阿尔法通道）描述一个颜色；其中，色相表示一个彩虹圆环上颜色所处的角度，red=0=360，green=120, blue=240，相比rgb更加直观，易于调整。

# 特性

## gap in flex

grid-gap 属性最初用于grid布局，是 grid-row-gap 和 grid-column-gap 的简写形式。

新的标准在 flex 与 grid 布局下统一使用 gap 关键字， 同时 grid 布局原有 grid- 前缀属性保持兼容。

目前 Edge Firefox Chrome 已经支持了 flex 布局下的 gap 属性。

基于此，间距相关的设置可以不必使用margin也不必考虑首尾节点如何清除缝隙，但gap依然会占用宽度，在某些场景，如自动缩放关闭、开启换行等场景下需要注意。

[像这样](https://codepen.io/duskray/pen/qBZWvpO)

## CSS Houdini

Houdini是一组底层API，它们公开了CSS引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展CSS. 它们使开发人员可以直接访问CSS对象模型（CSSOM），使开发人员可以编写浏览器可以解析为CSS的代码，从而创建新的CSS功能，而不必等待它们在浏览器中本地实现.

- CSS Parser API
- CSS Properties and Values API 
- CSS Typed OM
- CSS Layout API 
- CSS Painting API
- Worklets 

### CSS Properties and Values API 

允许显式定义css变量、类型检查、继承和默认值

定义写法包含js与css两种方式

```js
// Chromium 78
CSS.registerProperty({
  name: '--colorPrimary',
  syntax: '<color>',
  initialValue: 'red',
  inherits: false
})
```

```css
/* Chromium 85 */
@property --colorPrimary {
  syntax: '<color>';
  initial-value: red;
  inherits: false;
}
```

与更早的css变量api不同，此处的变量不再单纯被解析为字符串，它具有类型、初始值、继承状态

```css 
.card {
  background-color: var(--colorPrimary); /* red */
}

.highlight-card {
  --colorPrimary: yellow;
  background-color: var(--colorPrimary); /* yellow */
}

.another-card {
  --colorPrimary: 23;
  background-color: var(--colorPrimary); /* red */
}
```

除了color，还支持多种类型，包括length、percentage、url、integer等等

```html
<script>
  if ('paintWorklet' in CSS && 'registerProperty' in CSS && 'CSSUnitValue' in window) {
    CSS.registerProperty({
      name: '--dot-spacing',
      syntax: '<length>',
      initialValue: '20px',
      inherits: false
    });
    CSS.registerProperty({
      name: '--dot-fade-offset',
      syntax: '<percentage>',
      initialValue: '0%',
      inherits: false
    });
    CSS.registerProperty({
      name: '--dot-color',
      syntax: '<color>',
      initialValue: '#fff',
      inherits: false
    });
  } else {
    document.querySelector('html').classList.add('no-support');
  }
</script>
```

显式类型声明对于浏览器来说有许多好处，比如类型检查，比如在处理**渐变**的时候，浏览器能更好的识别数值型变量从而渲染渐变效果。

[非声明与声明css变量在处理渐变时的区别](https://codepen.io/duskray/pen/qBZOQXy)

### CSS Typed OM

CSS Typed OM API 允许将CSS值暴露为类型化的JavaScript对象。通常，css值可以以字符串形式在JavaScript中读取和写入，这可能很慢而且很麻烦。CSS类型对象模型API通过使用专用的JS对象来表示与基础值进行交互的接口，这些JS对象比字符串解析和连接更容易，更可靠地进行操作和理解。


#### computedStyleMap

computedStyleMap 可以获取对象CSS声明块的只读表示形式StylePropertyMapReadOnly

```js
const el = document.querySelector('#id')
const defaultComputedStyles = el.computedStyleMap()
```

[直接看代码](https://codepen.io/duskray/pen/JjXYeme)


### CSS Painting API

CSS Paint API 允许以编程方式定义图像并远程加载。

```js
registerPaint('headerHighlight', class {

  // 返回一个简单对象，描述上下文对象允许alpha透明
  static get contextOptions() { 
    return { alpha: true };
  }

  // 引入至props
  static get inputProperties() { return ['--boxColor', '--widthSubtractor']; }

  paint(ctx, size, props) {  
    // ctx渲染上下文可以使用(大部分) Canvas API 进行绘制
    ctx.fillStyle = 'hsla(55, 90%, 60%, 1.0)'
    ctx.fillRect(0, 15, 200, 20)
    // size对象包含.width和.height属性以访问元素的宽度和高度
    ctx.fillRect( 0, size.height / 3, size.width * 0.4, size.height * 0.6 );
    // props对象包含引入的css属性，需要使用inputProperties显式引入属性
    ctx.fillStyle = props.get('--boxColor'); 
    ctx.fillRect(0, size.height/3, size.width*0.4 - props.get('--widthSubtractor'), size.height*0.6);
  }

})
```

通过CSS Paint API能够构建复杂的模块化css图形

[比如这种](https://codepen.io/duskray/pen/XWdmody)

CSS Houdini目前多数api仍处于实验性阶段，高版本chrome和Edge支持了部分特性，FireFox尚未支持，必要时使用support检查

# 蝉

最后来一段生物学

*[周期蝉](https://zh.wikipedia.org/wiki/%E5%91%A8%E6%9C%9F%E8%9D%89)属（学名：Magicicada）是半翅目蝉科的一属，主要分布于北美，其生命周期为十三年或十七年，也被称为十七年蝉或十三年蝉。幼虫孵化后即钻入地下，一生绝大多数时间在地下度过，靠吸食树根的汁液生存。在地下生活十三年或十七年后，同种蝉的若虫同时破土而出，在 4-6 周内羽化、交配、产卵、死亡，而卵孵化后进入下一个生命周期。因此某一年份在美国东部一些地方每过十七或十三年就会突然出现的大量的蝉，成为一种奇景。*

*这两个周期都是质数，这样可以避开其他种类的掠食者。如果不是质数，那么就有更多机会和自己天敌的生命周期相重叠，降低族群数量。今假设17年蝉的天敌生命周期是5年，则两者要17x5=85年才能遇到一次。又假设一种13年蝉与一种17年蝉在同一地点竞争资源，需13x17=221年才会碰头一次。*

## 伪随机性

考虑单一系统内引入2个周期性的影响因子，最终系统输出的周期即是2个因子周期的最小公倍数 lcm(a, b)，由于 lcm(a, b) ≤ a * b，因此当2个周期互质时，系统输出的周期最大。周期越大，则意味着在有限的观察尺度内越难发现其循环规律，并以此模拟伪随机性。

通过将质数作为循环周期以模拟伪随机性的策略，称为”蝉原则“，以此可在静态css中创建伪随机纹理。

[一个🌰 by Lea Verou](https://codepen.io/leaverou/pen/oNbGzeE)

此外，可用使用少量图片素材生成大面积纹理，作为底图可以不必考虑高分辨率适配问题，同时展现更多细节变化，比传统大尺寸底图或单一循环底图具有优势。

[另一个🌰 by Yiting Liu](https://codepen.io/yitliu/pen/BEYWOp)

