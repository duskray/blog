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

####导出时千分符过滤
```js
node.DataTable({
    "columnDefs": columnDefs,
    "scrollX": true,
    "dom": 'Bfrtip',
    "buttons": [
        {
            extend: 'excelHtml5',
            exportOptions: {
                columns: ':visible',
                format: {
                    body: function(data, columnIdx) {
                        if (isNaN(Number(data.replace(/,/g, '')))) {
                            return data;
                        } else {
                            return data.replace(/,/g, '');
                        }
                    }
                }
            },
        }
    ]
});
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
$(...).DataTable().columns([string - jQuery selector]).visible(true);
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
/**
 * js模板简化表单
 * @param  {string} selector       table节点
 * @param  {string} templateSource 模板字符串
 * @param  {object} data           数据
 * @return {null}                
 */
sampleGrid: function(selector, templateSource, data) {
    var node = $(selector);
    node.DataTable().destroy();
    var columnDefs = [{
        type: "num-fmt",
        targets: 'thousands',
        render: function(data) {
            return $.isNumeric(data) ? data.commafy() : data;
        }
    }, {
        type: 'num-fmt',
        targets: 'percentage',
        render: function(data) {
            return data + '%';
        }
    }];
    var html = '';
    if (templateSource.indexOf('#') == 0) {
        html = template(templateId, data);
    } else {
        html = template.compile(templateSource)(data);
    }
    
    if (html == 'error') {
        showMessage('数据模板渲染错误');
        return null;
    }
    node.find('tbody').html(html);
    node.css("display", "table");
    return node.DataTable({
        "columnDefs": columnDefs,
        "scrollX": true,
        "dom": 'Bfrtip',
        "buttons": [
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, columnIdx) {
                            if (isNaN(Number(data.replace(/,/g, '')))) {
                                return data;
                            } else {
                                return data.replace(/,/g, '');
                            }
                        }
                    }
                },
            }
        ]
    });
},
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

####赋值
```js
$('#sltGroup').val('1').change()
```