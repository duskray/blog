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