using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Hosting
{
    //HttpContext--对当前HTTP上下文的抽象
    public abstract class HttpContext
    {
        public abstract HttpRequest Request { get; }
        public abstract HttpResponse Response { get; }
    }
    public abstract class HttpRequest
    {
        //当前请求地址的Url属性
        public abstract Uri Url { get; }
        //表示基地址的PathBase属性
        public abstract string PathBase { get; }
    }

    public abstract class HttpResponse
    {
        //输出流（OutputStream）
        public abstract Stream OutputStream { get; }
        //媒体类型（ContentType）
        public abstract string ContentType { get; set; }
        //响应状态码（StatusCode）
        public abstract int StatusCode { get; set; }
    }

}
