# 前端学习笔记
- [极客训练营](FrontEnd/geekuniversity/README.md)
- 浏览器原理
- 组件化
- 工具链
- 发布系统
- MVVM框架
  - vue
  - react
- 基础练习
 - MVVM
 - parse
 - promise
 - typescript
 - weppack 及热更新
 - vite
 - injector


# Abp 学习笔记

````C#

//Microsoft.AspNetCore
 public static IHostBuilder ConfigureWebHostDefaults(this IHostBuilder builder, Action<IWebHostBuilder> configure)
        {
            if (configure is null)
            {
                throw new ArgumentNullException(nameof(configure));
            }

            return builder.ConfigureWebHost(webHostBuilder =>
            {
                WebHost.ConfigureWebDefaults(webHostBuilder);

                configure(webHostBuilder);
            });
        }
        
        
  // Microsoft.AspNetCore.Hosting     
 public static IHostBuilder ConfigureWebHost(this IHostBuilder builder, Action<IWebHostBuilder> configure, Action<WebHostBuilderOptions> configureWebHostBuilder)
        {
            if (configure is null)
            {
                throw new ArgumentNullException(nameof(configure));
            }

            if (configureWebHostBuilder is null)
            {
                throw new ArgumentNullException(nameof(configureWebHostBuilder));
            }

            // Light up custom implementations namely ConfigureHostBuilder which throws.
            if (builder is ISupportsConfigureWebHost supportsConfigureWebHost)
            {
                return supportsConfigureWebHost.ConfigureWebHost(configure, configureWebHostBuilder);
            }

            var webHostBuilderOptions = new WebHostBuilderOptions();
            configureWebHostBuilder(webHostBuilderOptions);
            var webhostBuilder = new GenericWebHostBuilder(builder, webHostBuilderOptions);
            configure(webhostBuilder);
            builder.ConfigureServices((context, services) => services.AddHostedService<GenericWebHostService>());
            return builder;
        }
        
        
           internal static void ConfigureWebDefaults(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((ctx, cb) =>
            {
                if (ctx.HostingEnvironment.IsDevelopment())
                {
                    StaticWebAssetsLoader.UseStaticWebAssets(ctx.HostingEnvironment, ctx.Configuration);
                }
            });
            builder.UseKestrel((builderContext, options) =>
            {
                options.Configure(builderContext.Configuration.GetSection("Kestrel"), reloadOnChange: true);
            })
            .ConfigureServices((hostingContext, services) =>
            {
                // Fallback
                services.PostConfigure<HostFilteringOptions>(options =>
                {
                    if (options.AllowedHosts == null || options.AllowedHosts.Count == 0)
                    {
                        // "AllowedHosts": "localhost;127.0.0.1;[::1]"
                        var hosts = hostingContext.Configuration["AllowedHosts"]?.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                        // Fall back to "*" to disable.
                        options.AllowedHosts = (hosts?.Length > 0 ? hosts : new[] { "*" });
                    }
                });
                // Change notification
                services.AddSingleton<IOptionsChangeTokenSource<HostFilteringOptions>>(
                            new ConfigurationChangeTokenSource<HostFilteringOptions>(hostingContext.Configuration));

                services.AddTransient<IStartupFilter, HostFilteringStartupFilter>();
                services.AddTransient<IStartupFilter, ForwardedHeadersStartupFilter>();
                services.AddTransient<IConfigureOptions<ForwardedHeadersOptions>, ForwardedHeadersOptionsSetup>();

                services.AddRouting();
            })
            .UseIIS()
            .UseIISIntegration();
        }
````














