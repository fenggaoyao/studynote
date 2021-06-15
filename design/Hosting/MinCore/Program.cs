using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MinCore
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await new WebHostBuilder()
            .UseHttpListener()
            .Configure(app => app

                //.Use(ImageMiddleware)
                .Use(BarMiddleware)
                .Use(FooMiddleware)
                .Use(BazMiddleware)
                )
            .Build()
            .StartAsync();
        }

        public static RequestDelegate ImageMiddleware(RequestDelegate next)
=> async context =>
{
    Dictionary<string, string> mediaTypeMappings = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
    mediaTypeMappings.Add(".jpg", "image/jpeg");
    mediaTypeMappings.Add(".gif", "image/gif");
    mediaTypeMappings.Add(".png", "image/png");
    mediaTypeMappings.Add(".bmp", "image/bmp");
    mediaTypeMappings.Add(".html", "text/html");

    string filePath = context.Request.Url.LocalPath.Substring(context.Request.PathBase.Length + 1);
    filePath = Path.Combine(@"D:\Downloads", filePath).Replace('/', Path.DirectorySeparatorChar);
    filePath = File.Exists(filePath)
      ? filePath
      : Directory.GetFiles(Path.GetDirectoryName(filePath))
      .FirstOrDefault(it => string.Compare(Path.GetFileNameWithoutExtension(it), Path.GetFileName(filePath), true) == 0);

    if (!string.IsNullOrEmpty(filePath))
    {
        string extension = Path.GetExtension(filePath);
        string mediaType;
        if (mediaTypeMappings.TryGetValue(extension, out mediaType))
        {
            await context.Response.WriteFileAsync(filePath, mediaType);
        }
    }
    await next(context);

};

        public static RequestDelegate FooMiddleware(RequestDelegate next)
  => async context =>
  {
      await context.Response.WriteAsync("Foo=>");
      await next(context);
  };

        public static RequestDelegate BarMiddleware(RequestDelegate next)
        => async context =>
        {
            await context.Response.WriteAsync("Bar=>");
            await next(context);
        };

        public static RequestDelegate BazMiddleware(RequestDelegate next)
        => async context =>
        {
            await context.Response.WriteAsync("Baz");
            //await next(context);
        };
    }

    public static partial class Extensions
    {
        public static IWebHostBuilder UseHttpListener(this IWebHostBuilder builder, params string[] urls)
         => builder.UseServer(new HttpListenerServer(urls));

        public static Task WriteAsync(this HttpResponse response, string contents)
        {
            var buffer = Encoding.UTF8.GetBytes(contents);
            return response.Body.WriteAsync(buffer, 0, buffer.Length);
        }
        public static async Task WriteFileAsync(this HttpResponse response, string fileName, string contentType)
        {
            if (File.Exists(fileName))
            {
                byte[] content = File.ReadAllBytes(fileName);
                response.ContentType = contentType;
                await response.Body.WriteAsync(content, 0, content.Length);
            }
            response.StatusCode = 404;
        }
    }
}
