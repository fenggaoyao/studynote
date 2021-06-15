using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MinCore
{
    //如何表达HttpHandler，同步,Action<HttpContext>
    //异步：Func<HttpContext，Task>    
    public delegate Task RequestDelegate(HttpContext context);

    //创建一个application,pipeline=server+httphandler(将多个中间件构建成单一的httphandler)
    //所有httphandler=application
    public interface IApplicationBuilder
    {
        //先注册中间件
        IApplicationBuilder Use(Func<RequestDelegate, RequestDelegate> middleware);
        //构建成一个httphandler
        RequestDelegate Build();
    }

    
 
    public class ApplicationBuilder : IApplicationBuilder
    {
        //中间件
        private readonly List<Func<RequestDelegate, RequestDelegate>> _middlewares = new List<Func<RequestDelegate, RequestDelegate>>();
        public RequestDelegate Build()
        {
            //在调用第一个中间件（最后注册）的时候，我们创建了一个RequestDelegate作为输入，后者会将响应状态码设置为404。
            //所以如果ASP.NET Core应用在没有注册任何中间的情况下总是会返回一个404的响应。
            //如果所有的中间件在完成了自身的请求处理任务之后都选择将请求向后分发，同样会返回一个404响应。
            _middlewares.Reverse();
            return httpContext =>
            {
                RequestDelegate next = _ => { _.Response.StatusCode = 404; return Task.CompletedTask; };
                foreach (var middleware in _middlewares)
                {
                    next = middleware(next);
                }
                return next(httpContext);
            };
        }

        public IApplicationBuilder Use(Func<RequestDelegate, RequestDelegate> middleware)
        {
            _middlewares.Add(middleware);
            return this;
        }
    }


}
