# easy.Abp.Wechat

1、accesstoken
通过客户端类型，appid,以及appsceret获取到appSecret

```C#
            var requestUrl = $"https://api.weixin.qq.com/cgi-bin/token?grant_type={GrantTypes.ClientCredential}&appid={appId}&secret={appSecret}";

```

2 小程序

制作一个用于微信小程序扫码授权PC登录的widget
widget上需生成带参数的小程序码（可配置默认的AppId和HandlePage），参数为一个Guid的Token，于此同时以每3秒一次的频率携带Token轮询A接口
使用微信扫码后进入到小程序，确保小程序用户已登录，小程序以当前用户的身份携带Token访问B接口，从而将Token和UserId写入缓存（写入缓存的频率限制每分钟5次）
登录页轮询的A接口检测到缓存中匹配到了所携带的Token，于是登入并跳转，至此登录完成


IWeChatMiniProgramOptions:消息加密的 Token。微信公众号的 AppId 微信公众号的 API Secret
通过一个方法IWeChatMiniProgramOptionsResolver.ResolveAsync()
两种方式：IOptions<AbpWeChatMiniProgramOptions>.Value;
另一种方式：AsyncLocal IDisposable Change 的上下文切换


3、包装发送请求 DefaultWeChatMiniProgramApiRequester
var client = _httpClientFactory.CreateClient();
通过反射机制，GetType(),type.GetProperties();
propertyInfo.Name,或者 propertyInfo.GetCustomAttribute<JsonPropertyAttribute>()
使用自定义属性的名字
Value,则使用propertyInfo.GetValue(obj)

若使用动态语言
```
var obj={
    a:234,
    b:21
}
var str="?"
for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        str+=`${key}= ${obj[key]}&`
        console.log(str)   
    }
}
console.log(str.substring(0,str.length-1))
```

3、WeChatManagement

Common需求
WeChatApp 存储相关类型小程序、公众号、公众平台、AppId、AppSecret，
以及WeChatAppUser，单独存储一个用户表 SessionKey

根据当前用户的凭证appid，获取WeChatApp得到AbpWeChatMiniProgramOptions的配置表
通过微信开放能力获取并给当前用户绑定手机号

登录服务
绑定用户到identityUser，增加到用户登录LoginProvider，ProviderKey

登录
根据appid 获取到相应WeChatApp
调用登录Code2SessionAsync（）
调用 WhatChatApp



## GetPcLoginACodeAsync

设计成一个组件 小程序名字--->从存储中获得到OpenAppId、AppId、AppSecret、EncodingAesKey、Token


返回
```
{
    MiniProgramName = miniProgramName, 
    Token = aCode.Token,
    ACode = aCode.ACode  //用户扫描登录
};
```

获得小程序码
GetUnlimitedACodeAsync
```C#
 /// <summary>
        /// 获取小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
        /// </summary>
        /// <param name="scene">最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）</param>
        /// <param name="page">必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面</param>
        /// <param name="width">二维码的宽度，单位 px，最小 280px，最大 1280px</param>
        /// <param name="autoColor">自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false</param>
        /// <param name="lineColor">auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示</param>
        /// <param name="isHyaline">是否需要透明底色，为 true 时，生成透明底色的小程序</param>
        public Task<GetUnlimitedACodeResponse> GetUnlimitedACodeAsync(string scene, string page = null,
            short width = 430, bool autoColor = false, LineColorModel lineColor = null, bool isHyaline = false)
        {
            const string targetUrl = "https://api.weixin.qq.com/wxa/getwxacodeunlimit";

            var request = new GetUnlimitedACodeRequest(scene, page, width, autoColor, lineColor, isHyaline);

            return WeChatMiniProgramApiRequester.RequestGetBinaryDataAsync<GetUnlimitedACodeResponse>(targetUrl,
                HttpMethod.Post, request);
        }
```



## pcLogin

每隔3s去轮询读取pcLogin(见C#代码)，是否登录成功，然后跳转到对应的页面
```javascript
 easyAbp.weChatManagement.miniPrograms.login.login.pcLogin({token: token}, {
                        success: function (data) {
                            if (data.isSuccess) {
                                clearInterval(intervalID);
                                var urlParams = new URLSearchParams(document.location.search.slice(1));
                                var returnUrl = urlParams.get('ReturnUrl');
                                var returnUrlHash = urlParams.get('ReturnUrlHash');
                                var targetUrl = document.location.origin;
                                if (returnUrl) targetUrl += decodeURI(returnUrl);
                                if (returnUrlHash) targetUrl += returnUrlHash;
                                document.location.href = targetUrl;
                            }
                        }
                    });
```

```C#
    public virtual async Task<PcLoginOutput> PcLoginAsync(PcLoginInput input)
        {
            await _identityOptions.SetAsync();

            var cacheItem = await _pcLoginAuthorizationCache.GetAsync(input.Token);

            if (cacheItem == null)
            {
                return new PcLoginOutput { IsSuccess = false };
            }

            await _pcLoginAuthorizationCache.RemoveAsync(input.Token);

            var user = await _identityUserManager.GetByIdAsync(cacheItem.UserId);

            await _signInManager.SignInAsync(user, false);

            return new PcLoginOutput { IsSuccess = true };
        }

```


怎么识别哪个用户，然后在分布式缓存写入该值
loginProvider：WeChatApp:AppId
providerKey：openId或unionId

```C#
     /// <summary>
        /// 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。
        /// </summary>
        /// <param name="appId">小程序 appId</param>
        /// <param name="appSecret">小程序 appSecret</param>
        /// <param name="jsCode">登录时获取的 code</param>
        /// <param name="grantType">授权类型，此处只需填写 authorization_code</param>
        public Task<Code2SessionResponse> Code2SessionAsync(string appId, string appSecret, string jsCode, string grantType = "authorization_code")
        {
            const string targetUrl = "https://api.weixin.qq.com/sns/jscode2session?";

            var request = new Code2SessionRequest(appId, appSecret, jsCode, grantType);

            return WeChatMiniProgramApiRequester.RequestAsync<Code2SessionResponse>(targetUrl, HttpMethod.Get, request, false);
        }
```



