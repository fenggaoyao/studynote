
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Linq;


namespace Hosting
{
   public class Program
    {
        static void Main(string[] args)
        {
            new WebHostBuilder()
    .UseHttpListener()  //注册服务器，针对HTTP请求的监听、接收和最终的响应
    .UseUrls("http://localhost:3721/images") //监听地址
    .Configure(app => {
        app.UseTest(@"D:\Downloads").UseImages(@"D:\Downloads");
    }) //调用中间件
   // .Configure(app => app.UseImages(@"D:\Downloads")) //调用中间件
    .Build()
    .Start();
            Console.Read();
        }
    }

    public static class Extensions
    {
        private static Dictionary<string, string> mediaTypeMappings = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        static Extensions()
        {
            mediaTypeMappings.Add(".jpg", "image/jpeg");
            mediaTypeMappings.Add(".gif", "image/gif");
            mediaTypeMappings.Add(".png", "image/png");
            mediaTypeMappings.Add(".bmp", "image/bmp");
        }

        public static IWebHostBuilder UseHttpListener(this IWebHostBuilder builder)
        {
            return builder.ConfigureServices(services => services.AddSingleton<IServer, HttpListenerServer>());
        }
        public static IWebHostBuilder UseUrls(this IWebHostBuilder builder, params string[] urls)
        {
            string addresses = string.Join(";", urls);
            return builder.UseSetting("ServerAddresses", addresses);
        }

        public static IWebHostBuilder Configure(this IWebHostBuilder builder, Action<IApplicationBuilder> configure)
        {
            return builder.ConfigureServices(services => services.AddSingleton<IStartup>(new DelegateStartup(configure)));
        }

        public static IApplicationBuilder UseImages(this IApplicationBuilder app, string rootDirectory)
        {
            Func<RequestDelegate, RequestDelegate> middleware = next =>
            {
                return async context =>
                {
                    string filePath = context.Request.Url.LocalPath.Substring(context.Request.PathBase.Length + 1);
                    filePath = Path.Combine(rootDirectory, filePath).Replace('/', Path.DirectorySeparatorChar);
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
                            await context.Response.WriteFileAsync(filePath, "image/jpg");
                        }
                    }
                    await next(context);
                };
            };

            return app.Use(middleware);
        }

        public static IApplicationBuilder UseTest(this IApplicationBuilder app, string rootDirectory)
        {
            Func<RequestDelegate, RequestDelegate> middleware = next =>
            {
                return async context =>
                {
                    string filePath = context.Request.Url.LocalPath.Substring(context.Request.PathBase.Length + 1);
                    filePath = Path.Combine(rootDirectory, filePath).Replace('/', Path.DirectorySeparatorChar);
                    if (!string.IsNullOrEmpty(filePath) && filePath.Contains(".html"))
                    {
                        context.Response.ContentType = "text/html";
                        byte[] content= File.ReadAllBytes(filePath);
                        await context.Response.OutputStream.WriteAsync(content, 0, content.Length);
                        context.Response.StatusCode = 200;                        
                        
                    }

                    await next(context);
                };
            };
            return app.Use(middleware);
        }


        public static async Task WriteFileAsync(this HttpResponse response, string fileName, string contentType)
        {
            if (File.Exists(fileName))
            {
                byte[] content = File.ReadAllBytes(fileName);
                response.ContentType = contentType;
                await response.OutputStream.WriteAsync(content, 0, content.Length);
            }
            response.StatusCode = 404;
        }
    }
}
