using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MinCore
{
    public interface IServer
    {
        Task StartAsync(RequestDelegate handler);
    }
    public class HttpListenerServer : IServer
    {
        private readonly HttpListener _httpListener;
        private readonly string[] _urls;
        public HttpListenerServer(params string[] urls)
        {
            _httpListener = new HttpListener();
            _urls = urls.Any() ? urls : new string[] { "http://localhost:5000/" };
        }
        public async Task StartAsync(RequestDelegate handler)
        {
            Array.ForEach(_urls, url => _httpListener.Prefixes.Add(url));
            _httpListener.Start();
            while (true)
            {
                var listenerContext = await _httpListener.GetContextAsync();
                var feature = new HttpListenerFeature(listenerContext, _httpListener);
                var features = new FeatureCollection()
                .Set<IHttpRequestFeature>(feature)
                .Set<IHttpResponseFeature>(feature);
                //创建httpcontext
                var httpContext = new HttpContext(features);
                //根据httpcontext执行http请求
              await handler(httpContext)
                   .ContinueWith(_ => listenerContext.Response.Close());
                   
                ////释放
                //listenerContext.Response.Close();
            }
        }
    }

    public class HttpListenerFeature : IHttpRequestFeature, IHttpResponseFeature
    {
        private readonly HttpListenerContext _context;
        private readonly HttpListener _listener;
        public HttpListenerFeature(HttpListenerContext context, HttpListener listener)
        {
            _context = context;
            _listener = listener;
        }        

        Uri IHttpRequestFeature.Url => _context.Request.Url;
        NameValueCollection IHttpRequestFeature.Headers => _context.Request.Headers;
        NameValueCollection IHttpResponseFeature.Headers => _context.Response.Headers;
        Stream IHttpRequestFeature.Body => _context.Request.InputStream;
        Stream IHttpResponseFeature.Body => _context.Response.OutputStream;
        int IHttpResponseFeature.StatusCode { get => _context.Response.StatusCode; set => _context.Response.StatusCode = value; }
        string IHttpResponseFeature.ContentType { get => _context.Response.ContentType; set => _context.Response.ContentType = value; }
        string IHttpRequestFeature.PathBase => (from it in _listener.Prefixes
                            let pathBase = new Uri(it).LocalPath.TrimEnd('/')
                            where _context.Request.Url.LocalPath.StartsWith(pathBase, StringComparison.OrdinalIgnoreCase)
                            select pathBase).First();
    }


}
