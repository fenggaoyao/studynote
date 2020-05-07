扩展在$.fn的对象上，主要是$.fn.dataTable,$.fn.Datatable(),
$.fn.dataTableSettings,$.fn.dataTableExt
```javascript
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};
```
重点是Datatable对象，以及
