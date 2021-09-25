实现AbpViewComponent的ViewComponent需要引用脚本文件，另外在IViewComponentResult Invoke方法需要View的路径
AbpViewComponentHelper
```C#
    [Widget(
        StyleTypes = new [] { typeof(ChartjsStyleContributor) },
        ScriptTypes = new[] { typeof(TopSellingProductsWidgetScriptContributor) }
        )]
    public class TopSellingProductsWidgetViewComponent : AbpViewComponent
    {
        public virtual IViewComponentResult Invoke()
        {
            return View("/Pages/Shared/Components/TopSellingProductsWidget/Default.cshtml");
        }
    }

    [DependsOn(typeof(ChartjsScriptContributor))]
    public class TopSellingProductsWidgetScriptContributor : BundleContributor
    {
        public override void ConfigureBundle(BundleConfigurationContext context)
        {
            context.Files.Add("/Pages/Shared/Components/TopSellingProductsWidget/Default.js");
        }
    }
```


```javascript

 var widget = new abp.WidgetManager({
        filterForm: '#HostDashboardWidgetsArea',
        filterCallback: function() {
            var dateRange = $dateRangePicker.data('datepicker');

            return {
                startDate: dateRange.dates[0].toISOString(),
                endDate: dateRange.dates[1].toISOString()
            };
        }
    });

        $('#DashboardFilterForm').submit(function(e) {
        e.preventDefault();
        widget.refresh();
    });
    

```



```javascirpt 

 abp.widgets.TopSellingProductsWidget = function ($wrapper) {

        var _chart;

        var refresh = function (filters) {
            volo.easyCrm.dashboard.dashboard.getMostSellingProducts({
                startDate: filters.startDate,
                endDate: filters.endDate
            }).then(function (statistic) {
                    _chart.data = {
                        datasets: [{
                            data: statistic.map(x => x.count),
                            backgroundColor: colors.slice(0, statistic.length),
                            label: l('TotalSelling')
                        }],
                        labels: statistic.map(x => x.productName)
                    };
                    _chart.update();
                });
        };


        var init = function (filters) {
            _chart = new Chart($wrapper.find('.TopSellingProductsChart'),
                {
                    type: 'bar'
                });
            
            refresh(filters);
        };

        return {
            init: init,
            refresh: refresh
        };
    };
```



abp.ajax
abp.auth
abp.currentUser
abp.dom
abp.event
abp.features
abp.localization
abp.log
abp.ModalManager
abp.notify
abp.security
abp.setting
abp.ui
abp.utils
abp.ResourceLoader
abp.WidgetManager

Option:{
    wrapper:"",
    filterForm :"",
    filterCallback:"",
    init:function(){},
    refresh:function(){}
}

Other APIs

