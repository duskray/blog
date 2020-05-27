/** 使用 passive 改善的滚屏性能 */
var elem = document.getElementById('elem');
elem.addEventListener('touchmove', function listener() { /* do something */ }, { passive: true });

/** 简单uuid */
export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 高德坐标距离近似计算  
 * var start = new LngLat(116.368904, 39.923423);  
 * var end = new LngLat(116.387271, 39.922501);             
 * calculateLineDistance(start, end)  
 */
export const calculateLineDistance = (start, end) => {
  var d1 = 0.01745329251994329;
  var d2 = start.longitude;
  var d3 = start.latitude;
  var d4 = end.longitude;
  var d5 = end.latitude;
  d2 *= d1;
  d3 *= d1;
  d4 *= d1;
  d5 *= d1;
  var d6 = Math.sin(d2);
  var d7 = Math.sin(d3);
  var d8 = Math.cos(d2);
  var d9 = Math.cos(d3);
  var d10 = Math.sin(d4);
  var d11 = Math.sin(d5);
  var d12 = Math.cos(d4);
  var d13 = Math.cos(d5);
  var arrayOfDouble1 = [];
  var arrayOfDouble2 = [];
  arrayOfDouble1.push(d9 * d8);
  arrayOfDouble1.push(d9 * d6);
  arrayOfDouble1.push(d7);
  arrayOfDouble2.push(d13 * d12);
  arrayOfDouble2.push(d13 * d10);
  arrayOfDouble2.push(d11);
  var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
      (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
      (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2]));

  return(Math.asin(d14 / 2.0) * 12742001.579854401);
}

/** base64 to blob */
const b64toBlob = (b64Data = '', contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

/** Html转义 */
module.exports = function (str) {
  if (str == null) {
    return str;
  }

  if (typeof str !== "string") {
    str = String(str);
  }

  if (/[&<>\"\']/.test(String(str))) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\'/g, '&apos;')
      .replace(/\"/g, '&quot;');
  }
  else {
    return str;
  }
}

/** isEmptyObj */
const isEmptyObj = (obj) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

/** 人力触发一个下载（？ */
const iframe = document.createElement('iframe')
iframe.src = d
iframe.style.display = 'none'
document.body.appendChild(iframe)

/** 数组删除元素 */
var array = [2, 5, 9];
var index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}

/** 通用的isEmpty */
function isEmpty(obj) {
  if (obj === null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

isEmpty("") // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty({ length: 0, custom_property: [] }) // true

isEmpty("Hello") // false
isEmpty([1, 2, 3]) // false
isEmpty({ test: 1 }) // false
isEmpty({ length: 3, custom_property: [1, 2, 3] }) // false

/** 支持拼音 select2+simple-pinyin */
$.fn.select2.defaults.set("matcher", function (param, data) {
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

$('any').select2({
  language: 'zh-CN'
});

/** 设备判断 */
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

/** Date对象相关 */
new Date(2000, 0, 1, 0, 0, 0)
getTime() // 946656000000
toString() // Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)
toTimeString() // 00:00:00 GMT+0800 (中国标准时间)
toDateString() // Sat Jan 01 2000
toUTCString() // Fri, 31 Dec 1999 16:00:00 GMT
toLocaleString() // 2000/1/1 上午12:00:00
toLocaleString("zh-CN", { "hour12": false }) // 2000/1/1 00:00:00 *
toLocaleTimeString() // 上午12:00:00
toLocaleDateString() // 2000/1/1
Date.UTC(2000, 0, 1, 0, 0, 0) // 946688461000
