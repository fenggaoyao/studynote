using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Hosting
{
    //对应这个管道来说，请求的接收者和最终响应者都是服务器，
    //服务器接收到请求之后会创建自己的上下文来描述当前请求，针对请求的响应也通过这个原始上下文来完成
    public class DefaultHttpContext : HttpContext
    {
        public IFeatureCollection HttpContextFeatures { get; }
        public DefaultHttpContext(IFeatureCollection httpContextFeatures)
        {
            this.HttpContextFeatures = httpContextFeatures;
            this.Request = new DefaultHttpRequest(this);
            this.Response = new DefaultHttpResponse(this);
        }
        public override HttpRequest Request { get; }
        public override HttpResponse Response { get; }
    }
    public class DefaultHttpRequest : HttpRequest
    {
        public IHttpRequestFeature RequestFeature { get; }
        public DefaultHttpRequest(DefaultHttpContext context)
        {
            this.RequestFeature = context.HttpContextFeatures.Get<IHttpRequestFeature>();
        }
        public override Uri Url
        {
            get { return this.RequestFeature.Url; }
        }

        public override string PathBase
        {
            get { return this.RequestFeature.PathBase; }
        }
    }
    public class DefaultHttpResponse : HttpResponse
    {
        public IHttpResponseFeature ResponseFeature { get; }

        public override Stream OutputStream
        {
            get { return this.ResponseFeature.OutputStream; }
        }

        public override string ContentType
        {
            get { return this.ResponseFeature.ContentType; }
            set { this.ResponseFeature.ContentType = value; }
        }

        public override int StatusCode
        {
            get { return this.ResponseFeature.StatusCode; }
            set { this.ResponseFeature.StatusCode = value; }
        }

        public DefaultHttpResponse(DefaultHttpContext context)
        {
            this.ResponseFeature = context.HttpContextFeatures.Get<IHttpResponseFeature>();
        }
    }
    public interface IHttpRequestFeature
    {
        Uri Url { get; }
        string PathBase { get; }
    }
    public interface IHttpResponseFeature
    {
        Stream OutputStream { get; }
        string ContentType { get; set; }
        int StatusCode { get; set; }
    }
}


