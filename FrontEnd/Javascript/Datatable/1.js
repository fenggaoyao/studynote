(
    function ($, window, document, undefined) {

        var DataTable = function (options) {
            this.$ = function () {};
            this._ = function () {};
            this.api = function (traditional) {
                return traditional ?
                    new _Api(
                        _fnSettingsFromNode(this[_ext.iApiIndex])
                    ) :
                    new _Api(this);
            };
            this.fnAddData;
            this.fnAdjustColumnSizing;
            this.fnClearTable;
            this.fnDeleteRow;
            this.fnDestroy;
            this.fnDraw;
            this.fnFilter;
            this.fnGetData;
            this.fnGetPosition;
            this.fnIsOpen;
            this.fnPageChange;
            this.fnSetColumnVis;
            this.fnSettings;
            this.fnSort;
            this.fnSortListener;
            this.fnUpdate;
            this.fnVersionCheck;
            this.oApi = this.internal = _ext.internal;
            this.each(function () {});
            return this;

        }
        var _ext; // DataTable.ext
        var _Api; // DataTable.Api
        var _api_register; // DataTable.Api.register
        var _api_registerPlural; // DataTable.Api.registerPlural
        DataTable.util = {};
        var __apiStruct = [];

        _Api = function (context, data) {
            //构造方法,构建的是例法方法
            _Api.extend(this, this, __apiStruct); //执行
        }

        DataTable.Api = _Api;
        $.extend(_Api.prototype, {

            context: [], // array of table settings objects
            iterator: function () {},
        });
        _Api.extend = function (scope, obj, ext) {

            return function () {
                var ret = fn.apply(scope, arguments);

                // Method extension
                _Api.extend(ret, ret, struc.methodExt);
                return ret;

                // Property extension
                _Api.extend(scope, obj[struct.name], struct.propExt);
            };


        }
        _Api.register = _api_register = function (name, val) {}
        _Api.registerPlural = _api_registerPlural = function (pluralName, singularName, val) {}
        /*实例方法
         * _api_register("",function(){})   
         * tables, table, draw, page, ajax, rows, row, columns, column, cells, cell, 
         * order, search, state, $, on, one, off, clear, settings, init, data, destroy, i18n
         */
        DataTable.version = "1.10.20";
        DataTable.settings = {}
        DataTable.models = {}
        DataTable.models.oSearch = {}
        DataTable.models.oRow = {}
        DataTable.models.oColumn = {}
        DataTable.defaults = {} //重要
        DataTable.defaults.column = {}
        DataTable.models.oSettings = {}
        DataTable.ext = _ext = {}
        $.extend(_ext, {}); //扩展方法
        $.extend(DataTable.ext.classes, {});
        $.extend(DataTable.ext.internal, {});
        $.extend(extPagination, {});
        $.extend(true, DataTable.ext.renderer, {});

        DataTable.render = {}
        $.extend(DataTable.ext.internal, {
            _fnBuildAjax: _fnBuildAjax
            //......很多方法
        });
        $.fn.dataTable = DataTable;

        $.fn.dataTableSettings = DataTable.settings;
        $.fn.dataTableExt = DataTable.ext;

        DataTable.$ = $;

        $.fn.DataTable = function (opts) {
            return $(this).dataTable(opts).api(); //this是html元素，$(this)指的是jquery对象
        };

        $.each(DataTable, function (prop, val) {
            $.fn.DataTable[prop] = val;
        });

        return $.fn.dataTable;

    }

)