# 对象
## 建模
领域实体与传输对象dto是不一样的，传输对象dto需要分页方面的数据
值对象：ValueObject 返回迭代的属性 yield
领域实体：Entity：GetKeys; 
        （1）加审计功能：
            - 1、创建CreationAudit
            - 2、创建+修改 AuditedEntity
            - 3  完全审计+删除标志 FullAuditedEntity          
         2）聚合创建者WithUser TUser
        (3)聚合根AggregateRoot
            添加领域事件（本地、分布式）

加扩展属性IHasExtraProperties
它进行扩展



**ExtensionPropertyConfiguartion**:它的Type是Entity,它的本身有Attributes，Validators，DisplayName，Configuration，它还具有
ExtensionPropertyUiConfigration => onTable  OnCreateForm  OnEditForm
ExtensionPropertyApiConfigration =》 OnGet  OnCreate    OnUpdate

EntityExtensionConfiguration，它的下面有Properties（属性字典集合）,Validators,Configuration

它使用是ObjectExtensionManager进行相应操作



**ModuleExtensionConfiguration** 它包含多个Entities字典集，配置项Configuration



在UI层操作
 var moduleNames = Object.keys(abp.objectExtensions.modules);

最后在配置项增加了abp.ui.extensions
其中tableName是abp.utils.toCamelCase(moduleName) + "." + abp.utils.toCamelCase(entityName);

```javascript

abp.ui.extensions.tableColumns =(function(){    
            return {
                addContributor: _addContributor,
                get columns() {
                    return _getColumns();
                }
            };
})()


   function configureTableColumns(tableName, columnConfigs) {
            abp.ui.extensions.tableColumns.get(tableName)
                .addContributor(
                    function (columnList) {
                        columnList.addManyTail(columnConfigs);
                    }
                );
        }
        
```

扩展了$.fn.dataTableExt.oApi.renderRowActions，$.fn.dataTable.defaults

```javascript
     $.fn.dataTableExt.oApi.renderRowActions =
            function (tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (_existingApiRenderRowActionsFunction) {
                    _existingApiRenderRowActionsFunction(tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull);
                }

                renderRowActions(tableInstance, nRow, aData, iDisplayIndex, iDisplayIndexFull);
            };

             var _existingDefaultFnRowCallback = $.fn.dataTable.defaults.fnRowCallback;

        $.extend(true,
            $.fn.dataTable.defaults,
            {
                fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (_existingDefaultFnRowCallback) {
                        _existingDefaultFnRowCallback(this, nRow, aData, iDisplayIndex, iDisplayIndexFull);
                    }

                    renderRowActions(this, nRow, aData, iDisplayIndex, iDisplayIndexFull);
                }
            });

```


传输对象：
- PagedResultDto
- PagedAndSortedResultRequestDto

        



