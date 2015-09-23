###js相关
------------
####初始化
```js
$(function(){  
    //some code
});
```

####事件存在检测
```js
var btnExport = $('#id');
var events = $._data(btnExport[0],"events");
if(!events) {
   //some code
}
```

####Date对象相关
```
new Date(2000, 0, 1, 0, 0, 0)
getTime():  946656000000
toString():  Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)
toTimeString():  00:00:00 GMT+0800 (中国标准时间)
toDateString():  Sat Jan 01 2000
toUTCString():  Fri, 31 Dec 1999 16:00:00 GMT
toLocaleString():  2000/1/1 上午12:00:00
toLocaleString("zh-CN", {"hour12": false}):  2000/1/1 00:00:00 *
toLocaleTimeString():  上午12:00:00
toLocaleDateString():  2000/1/1
Date.UTC(2000, 0, 1, 0, 0, 0):  946688461000
```
\* toLocaleString()的[更多信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

####jQuery控件
```js
(function ($) {
	$.fn.somefunction = function(options) {
		...
	}
}(jQuery));
```

###About DataTables
------------
####default options
```js
$.extend( $.fn.dataTable.defaults, {
    "autoWidth": false,
    "paging":   false,
    "ordering": false,
    "info":     false,
    "searching": false,
    "language": {
        "emptyTable": "没有数据"
    }
});
```

####访问API
```js
$( selector ).DataTable();
$( selector ).dataTable().api();
new $.fn.dataTable.Api( selector );
```

####固定列重绘
```js
$('#basic-day-grid').on('draw.dt', function () {
    $(this).DataTable().fixedColumns().relayout();
});
```

####千分符
```js
String.prototype.commafy = function () {
    return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
}

Number.prototype.commafy = function () {
    return String(this).commafy();
}
```

####列渲染
```js
node.DataTable({
    "columnDefs": [{ 
        "type": "num-fmt", 
        "targets": 'thousands', 
        "render": function(data) {
            return data ? data.commafy() : data;
        }
    }]
});
```

####隐藏列
```js
$(...).DataTable().column(0).visible(false);
```

####给自己的参考
*之前与artTemplate使用的初始化, 感觉有哪里不对...*
```js
var node = $(...);
var table = node.DataTable();
table.destroy();

$('div.content').find('center.error-msg').remove();
var html = template(nodeid + '-template', data);
if (html == 'error') { // 模板数据错误
    $('table.table').css("display", "none");
    var errmsg = $('<center class="error-msg"><div style="width:100%;height:100%;background-color:#ff9600;color:#ffffff">查询发生了错误，可能需要管理员的帮助。</div></center>');
    $('div.content').append(errmsg);
    return;
}

node.find('tbody').html(html);
$('table.table').css("display", "table");
node.DataTable({
    "columnDefs": columnDefs,
    "scrollX": true,
    "fixedColumns": fixedOption,
    "dom": 'Bfrtip',
    "buttons": [
    //     'copyHtml5',
    //     'csvHtml5',
    //     'pdfHtml5',
    //     'excelFlash'
        'excelHtml5'
    ]
});
```