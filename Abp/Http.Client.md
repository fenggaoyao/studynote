# Volo.Abp.HttpClient
 一个常见的情况，在appsettings 文件 配置RemoteServices的地址
然后对一个公开接口，设置代理，指定这个接口使用远程服务地址的使用（http api服务调用）
在访问地址需要用到
1、 认证、获取bear token
2、 缓存
3、


```C#
  public interface IRemoteServiceHttpClientAuthenticator
    {
        Task Authenticate(RemoteServiceHttpClientAuthenticateContext context); //TODO: Rename to AuthenticateAsync
    }
```
 在Authentication里定义了一个接口IRemoteServiceHttpClientAuthenticator，它的上下文RemoteServiceHttpClientAuthenticateContext包括 Client Request RemoteServiceConfiguration
   RemoteServiceName,它的接口实现是在参数Request 添加了请求参数


  ## Volo.Abp.IdentityModel
  IIdentityModelAuthenticationService  TryAuthenticateAsync() 获取得token就返回true,否则是false
```C#
    public interface IIdentityModelAuthenticationService
    {
        Task<bool> TryAuthenticateAsync(
            [NotNull] HttpClient client,
            string identityClientName = null);

        Task<string> GetAccessTokenAsync(
            IdentityClientConfiguration configuration);
    }
```

  获取token,首先GetDiscoveryDocumentAsync获取端点，在获取之前添加header 添加
  然后分**ClientCredentials**和**Password**两种模式，获取token

 ## Volo.Abp.Http.Client.IdentityModel
  实现IdentityModel基础上实现 IRemoteServiceHttpClientAuthenticator，要看上下文RemoteServiceHttpClientAuthenticateContext是怎么赋值的

## Volo.Abp.Http.Client.IdentityModel.Web
  重写了方法，主要看是否GetUseCurrentAccessToken，如果不等于false（true）,则在httpContext取出access_token再去访问，否则是使用基类的方法