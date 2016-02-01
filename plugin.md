###About DataTables
------------
####default options
```js
$.extend($.fn.dataTable.defaults, {
    "info": false,
    "searching": false,
    "language": {
        "emptyTable": "没有数据",
        "paginate": {
            "previous": "上一页",
            "next": "下一页"
        }
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

####隐藏列(by index)
```js
$(...).DataTable().column(0).visible(false);
$(...).DataTable().columns([2, 3, 4]).visible(true);
```

####排序列
```js
var grid = UI.trendGrid('income-grid', data.basic_data)
if(grid) {
    grid.column(1).order('desc').draw();
}
```

####修改单页行数
```js
grid.page.len(30).draw();
```

####给自己的参考
*之前与artTemplate使用的初始化, 感觉有哪里不对...*
```js
function(nodeid, data, fixedColumns, otherDefs) {
    var node = $('#' + nodeid);
    node.DataTable().destroy();
    var fixedOption = fixedColumns ? {
        leftColumns: fixedColumns
    } : false;
    var columnDefs = [{
        type: "num-fmt",
        targets: 'thousands',
        render: function(data) {
            return data ? data.commafy() : data;
        }
    }, {
        type: 'num-fmt',
        targets: 'percentage',
        render: function(data) {
            return data + '%';
        }
    }];
    if (otherDefs) {
        columnDefs.push(otherDefs);
    }
    dataFormat(data);
    $('div.content').find('center.error-msg').remove();
    var html = template(nodeid + '-template', data);
    if (html == 'error') {
        node.css("display", "none");
        var errmsg = $('<center class="error-msg"><div style="width:100%;height:100%;background-color:#ff9600;color:#ffffff">服务器返回了错误的结果，这可能需要管理员的帮助。</div></center>');
        node.closest('div.content').append(errmsg);
        return null;
    }
    node.find('tbody').html(html);
    node.css("display", "table");
    var api = node.DataTable({
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

    return api;
}
```

###About select2 4.0
------------
####支持拼音搜索
```js
$.fn.select2.defaults.set("matcher", function(param, data) {
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
```
