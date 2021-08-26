using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hosting
{
    public interface IApplicationBuilder
    {
        //所有注册的中间件转换成一个RequestDelegate对象
        RequestDelegate Build();
        //Use方法实现了针对中间件的注册
        IApplicationBuilder Use(Func<RequestDelegate, RequestDelegate> middleware);
    }

    public class ApplicationBuilder : IApplicationBuilder
    {
        private IList<Func<RequestDelegate, RequestDelegate>> middlewares = new List<Func<RequestDelegate, RequestDelegate>>();

        public RequestDelegate Build()
        {
            //RequestDelegate seed = context => Task.Run(() => { });           
            //return middlewares.Reverse().Aggregate(seed, (next, current) => current(next));
            middlewares.Reverse();
            return httpContext =>
            {
                RequestDelegate next = _ => { _.Response.StatusCode = 404; return Task.CompletedTask; };
                foreach (var middleware in middlewares)
                {
                    next = middleware(next);
                }
                return next(httpContext);
            };

        }

        public IApplicationBuilder Use(Func<RequestDelegate, RequestDelegate> middleware)
        {
            middlewares.Add(middleware);
            return this;
        }
    }
}
