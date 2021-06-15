using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Text;

namespace MinCore
{
    public class HttpContext
    {
        public HttpRequest Request { get; }
        public HttpResponse Response { get; }

        public HttpContext(IFeatureCollection features)
        {
            Request = new HttpRequest(features);
            Response = new HttpResponse(features);
        }
    }

    public class HttpRequest
    {
        private readonly IHttpRequestFeature _feature;

        public Uri Url => _feature.Url;
        public NameValueCollection Headers => _feature.Headers;
        public Stream Body => _feature.Body;
        public string PathBase => _feature.PathBase;

        public HttpRequest(IFeatureCollection features) => _feature = features.Get<IHttpRequestFeature>();
    }
    public class HttpResponse
    {
        private readonly IHttpResponseFeature _feature;

        public NameValueCollection Headers => _feature.Headers;
        public string ContentType { get =>_feature.ContentType;set =>_feature.ContentType=value;}
        public Stream Body => _feature.Body;
        public int StatusCode { get => _feature.StatusCode; set => _feature.StatusCode = value; }

        public HttpResponse(IFeatureCollection features) => _feature = features.Get<IHttpResponseFeature>();

    }

    public interface IHttpRequestFeature
    {
        Uri Url { get; }
        NameValueCollection Headers { get; }
        Stream Body { get; }
        string PathBase { get; }
    }
    public interface IHttpResponseFeature
    {
        int StatusCode { get; set; }
        NameValueCollection Headers { get; }
        string ContentType { get; set; }
        Stream Body { get; }
    }

    public interface IFeatureCollection : IDictionary<Type, object> { }
    public class FeatureCollection : Dictionary<Type, object>, IFeatureCollection { }
    public static partial class Extensions
    {
        public static T Get<T>(this IFeatureCollection features) => features.TryGetValue(typeof(T), out var value) ? (T)value : default(T);
        public static IFeatureCollection Set<T>(this IFeatureCollection features, T feature)
        {
            features[typeof(T)] = feature;
            return features;
        }
    }

}

