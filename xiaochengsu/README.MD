

document.getElementsByTagName("webview")



微信页面渲染层的页面结构
document.getElementsByTagName("webview")[0].showDevTools(true,null)
注意点在微信小游戏里面微信重写了window和document对象 所以不能直接按照我们平常操作页面那样使用

方法是我们在首页控制台里面输入openVendor()


.wxvpkg文件就是每个基础库版本的包我们，解压这个包我们可以看到他的组成

wcc 可执行程序，用于将 wxml 转为 view 模块使用的js

wcsc 可执行程序，用于将 wxss 转为 view 模块使用的 css


.wxvpkg包里面这个基础库文件的WAWebview.js和WAService.js

首次加载的时候wcc执行了-ds -d - xc…和-ds -d - cc…结构的命令可以看到微信首次把所有.wxml都执行了
可以看到参数里面有个数字其实他对应的有几种.wxml文件形式向只存在.wxml和自定义组件等一些格式他是没计算在内的
-xc -cc 其实对应就是下面图两个逻辑层和渲染层里面的js方式

wcc执行的命令最终生成的就是逻辑层和渲染层的$gwxc()方法里面的js代码，大家可以自己手动测试下就会发现


wxss生成的主要是渲染层eval()这一坨代码
