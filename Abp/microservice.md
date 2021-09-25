# 负载均衡

基于腾讯云的Nginx的云服务，可证书和路由的管理

# 认证与授权



# 网关

授权模式


请求参数


# 租户设计

## 判断当前租户

  当前用户拥有租户Id，当前用户是主要通过当前线程的上下文获取（Thread.CurrentPrincipal）
  而且这个Thread.CurrentPrincipal，则是在请求服务header 携带bear token，服务进行鉴权，通过则写入当前线程的上下文的CurrentPrincipal

```C#
 public interface ICurrentUser
    {
        bool IsAuthenticated { get; }
        [CanBeNull]
        Guid? Id { get; }
        [CanBeNull]
        string UserName { get; }
        [CanBeNull]
        string PhoneNumber { get; }        
        bool PhoneNumberVerified { get; }
        [CanBeNull]
        string Email { get; }
        bool EmailVerified { get; }
        Guid? TenantId { get; }
        [NotNull]
        string[] Roles { get; }
        [CanBeNull]
        Claim FindClaim(string claimType);
        [NotNull]
        Claim[] FindClaims(string claimType);
        [NotNull]
        Claim[] GetAllClaims();
        bool IsInRole(string roleName);
    }
}

```
## 租户的切换




```C#

   using (_currentTenant.Change(tenant?.Id, tenant?.Name))
            {
                await next(context);
            }



 public interface ICurrentTenant
    {
        bool IsAvailable { get; }

        [CanBeNull]
        Guid? Id { get; }

        [CanBeNull]
        string Name { get; }

        IDisposable Change(Guid? id, string name = null);
    }


      public IDisposable Change(Guid? id, string name = null)
        {
            var parentScope = _currentTenantAccessor.Current;
            _currentTenantAccessor.Current = new BasicTenantInfo(tenantId, name);
            return new DisposeAction(() =>
            {
                _currentTenantAccessor.Current = parentScope;
            });
        }


```




