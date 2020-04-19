# Entity用法例子

1. Entity 转换库：[he](https://github.com/mathiasbynens/he)

2. Entity 使用场景：

   详细可以查看文章：[https://juejin.im/post/5e958768518825739b2d3e31](https://juejin.im/post/5e958768518825739b2d3e31)

   调用 PC 端支付宝支付，会返回如下表单：

```js
<form name="punchout_form" method="post" action="https://openapi.alipay.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=XXX&return_url=https%3A%2F%2Fwww.xxx.com&notify_url=http%3A%2F%2Fxxx.com&version=1.0&app_id=2016021401143890&sign_type=RSA2&timestamp=2020-04-11+12%3A54%3A21&alipay_sdk=alipay-sdk-java-4.8.10.ALL&format=json">
<input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;00000&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;,&quot;subject&quot;:&quot;充值&quot;,&quot;time_expire&quot;:&quot;2020-04-11 13:54:21&quot;,&quot;total_amount&quot;:&quot;999&quot;}">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();</script>
```

    如果需要截取其中参数，可以用he库进行转换，例如：

```js
he.decode('encoded string', {
  isAttributeValue: true,
});
```

转换结果如下：

```js
<form name="punchout_form" method="post" action="https://openapi.alipay.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=XXX&return_url=https%3A%2F%2Fwww.xxx.com&notify_url=http%3A%2F%2Fxxx.com&version=1.0&app_id=2016021401143890&sign_type=RSA2&timestamp=2020-04-11+12%3A54%3A21&alipay_sdk=alipay-sdk-java-4.8.10.ALL&format=json">
<input type="hidden" name="biz_content" value="{"out_trade_no":"00000","product_code":"FAST_INSTANT_TRADE_PAY","subject":"充值","time_expire":"2020-04-11 13:54:21","total_amount":"999"}">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();</script>
```

    不过该场景很少出现，而且只需要在服务端处理，主要目的是将表单所带参数拼接成链接，并重定向到支付宝页面。
    不转换会导致支付宝无法正常解析参数，因此要把Entity转换成普通字符，如&quot;转换成"。
    前端可以直接将支付宝返回的表单写入HTML，浏览器会自动处理成正常格式。