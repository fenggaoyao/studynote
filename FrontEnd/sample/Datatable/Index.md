扩展在$.fn的对象上，主要是$.fn.dataTable,$.fn.Datatable(),
$.fn.dataTableSettings,$.fn.dataTableExt
```javascript
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};
```
首先执行是Datatable函数对象方法，它在jquery的实例上添加很多方法，重点是api()方法  
执行.api()方法，它执行了闭包__apiStruct保存的_api_register()方法  


