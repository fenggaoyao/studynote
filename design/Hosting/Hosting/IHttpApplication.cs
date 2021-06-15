using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Hosting
{
    //泛型参数TContext代表它针对每个请求而建立的上下文
    public interface IHttpApplication<TContext>
    {
        //一个HttpApplication对象在接收到Server转发的请求之后需要完成三项基本的操作，
        //即创建上下文
        TContext CreateContext(IFeatureCollection contextFeatures);
        //请求处理完成之后释放上下文
        void DisposeContext(TContext context, Exception exception);
        //在上下文中处理请求
        Task ProcessRequestAsync(TContext context);
    }

    public class HostingApplication : IHttpApplication<Context>
    {
        //一个HttpApplication对象可以视为对一组中间件的封装，
        //它对请求的处理工作最终交给这些中间件来完成，
        //所有中间件对请求的处理最终可以转换成一个RequestDelegate对象
        public RequestDelegate Application { get; }

        public HostingApplication(RequestDelegate application)
        {
            this.Application = application;
        }

        public Context CreateContext(IFeatureCollection contextFeatures)
        {
            HttpContext httpContext = new DefaultHttpContext(contextFeatures);
            return new Context
            {
                HttpContext = httpContext,
                StartTimestamp = Stopwatch.GetTimestamp()
            };
        }

        public void DisposeContext(Context context, Exception exception) => context.Scope?.Dispose();
        public Task ProcessRequestAsync(Context context) => this.Application(context.HttpContext);
    }

    public class Context
    {
        //一个Context对象是对一个HttpContext的封装，
        //后者是真正描述当前HTTP请求的上下文，承载着最为核心的上下文信息。
        //除此之外，我们还为Context定义了Scope和StartTimestamp两个属性，两者与日志记录和事件追踪有关，
        //前者被用来将针对同一请求的多次日志记录关联到同一个上下文范围（即Logger的BeginScope方法的返回值）；
        //后者表示开始处理请求的时间戳，如果在完成请求处理的时候记录下当前的时间戳，我们就可以计算出整个请求处理所花费的时间。
        public HttpContext HttpContext { get; set; }
        public IDisposable Scope { get; set; }
        public long StartTimestamp { get; set; }
    }
}
