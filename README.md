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
        
        
      //  Microsoft.AspNetCore.Server.Kestrel
              public static IWebHostBuilder UseKestrel(this IWebHostBuilder hostBuilder)
        {
            hostBuilder.UseQuic();
            return hostBuilder.ConfigureServices(services =>
            {
                // Don't override an already-configured transport
                services.TryAddSingleton<IConnectionListenerFactory, SocketTransportFactory>();

                services.AddTransient<IConfigureOptions<KestrelServerOptions>, KestrelServerOptionsSetup>();
                services.AddSingleton<IServer, KestrelServerImpl>();
            });
        }
        
        //Microsoft.AspNetCore.Hosting
        //GenericWebHostService
          public async Task StartAsync(CancellationToken cancellationToken)
        {
            HostingEventSource.Log.HostStart();

            var serverAddressesFeature = Server.Features.Get<IServerAddressesFeature>();
            var addresses = serverAddressesFeature?.Addresses;
            if (addresses != null && !addresses.IsReadOnly && addresses.Count == 0)
            {
                var urls = Configuration[WebHostDefaults.ServerUrlsKey];
                if (!string.IsNullOrEmpty(urls))
                {
                    serverAddressesFeature!.PreferHostingUrls = WebHostUtilities.ParseBool(Configuration, WebHostDefaults.PreferHostingUrlsKey);

                    foreach (var value in urls.Split(';', StringSplitOptions.RemoveEmptyEntries))
                    {
                        addresses.Add(value);
                    }
                }
            }

            RequestDelegate? application = null;

            try
            {
                var configure = Options.ConfigureApplication;

                if (configure == null)
                {
                    throw new InvalidOperationException($"No application configured. Please specify an application via IWebHostBuilder.UseStartup, IWebHostBuilder.Configure, or specifying the startup assembly via {nameof(WebHostDefaults.StartupAssemblyKey)} in the web host configuration.");
                }

                var builder = ApplicationBuilderFactory.CreateBuilder(Server.Features);

                foreach (var filter in StartupFilters.Reverse())
                {
                    configure = filter.Configure(configure);
                }

                configure(builder);

                // Build the request pipeline
                application = builder.Build();
            }
            catch (Exception ex)
            {
                Logger.ApplicationError(ex);

                if (!Options.WebHostOptions.CaptureStartupErrors)
                {
                    throw;
                }

                var showDetailedErrors = HostingEnvironment.IsDevelopment() || Options.WebHostOptions.DetailedErrors;

                application = ErrorPageBuilder.BuildErrorPageApplication(HostingEnvironment.ContentRootFileProvider, Logger, showDetailedErrors, ex);
            }

            var httpApplication = new HostingApplication(application, Logger, DiagnosticListener, ActivitySource, Propagator, HttpContextFactory);
            //重点
            await Server.StartAsync(httpApplication, cancellationToken);

            if (addresses != null)
            {
                foreach (var address in addresses)
                {
                    Log.ListeningOnAddress(LifetimeLogger, address);
                }
            }

            if (Logger.IsEnabled(LogLevel.Debug))
            {
                foreach (var assembly in Options.WebHostOptions.GetFinalHostingStartupAssemblies())
                {
                    Log.StartupAssemblyLoaded(Logger, assembly);
                }
            }

            if (Options.HostingStartupExceptions != null)
            {
                foreach (var exception in Options.HostingStartupExceptions.InnerExceptions)
                {
                    Logger.HostingStartupAssemblyError(exception);
                }
            }
        }
        
        
        //Microsoft.AspNetCore.Server.Kestrel.Core
        //KestrelServerImpl
        public async Task StartAsync<TContext>(IHttpApplication<TContext> application, CancellationToken cancellationToken) where TContext : notnull
        {
            try
            {
                ValidateOptions();

                if (_hasStarted)
                {
                    // The server has already started and/or has not been cleaned up yet
                    throw new InvalidOperationException(CoreStrings.ServerAlreadyStarted);
                }
                _hasStarted = true;

                ServiceContext.Heartbeat?.Start();

                async Task OnBind(ListenOptions options, CancellationToken onBindCancellationToken)
                {
                    var hasHttp1 = options.Protocols.HasFlag(HttpProtocols.Http1);
                    var hasHttp2 = options.Protocols.HasFlag(HttpProtocols.Http2);
                    var hasHttp3 = options.Protocols.HasFlag(HttpProtocols.Http3);
                    var hasTls = options.IsTls;

                    // Filter out invalid combinations.

                    if (!hasTls)
                    {
                        // Http/1 without TLS, no-op HTTP/2 and 3.
                        if (hasHttp1)
                        {
                            hasHttp2 = false;
                            hasHttp3 = false;
                        }
                        // Http/3 requires TLS. Note we only let it fall back to HTTP/1, not HTTP/2
                        else if (hasHttp3)
                        {
                            throw new InvalidOperationException("HTTP/3 requires HTTPS.");
                        }
                    }

                    // Quic isn't registered if it's not supported, throw if we can't fall back to 1 or 2
                    if (hasHttp3 && _multiplexedTransportFactory is null && !(hasHttp1 || hasHttp2))
                    {
                        throw new InvalidOperationException("This platform doesn't support QUIC or HTTP/3.");
                    }

                    // Disable adding alt-svc header if endpoint has configured not to or there is no
                    // multiplexed transport factory, which happens if QUIC isn't supported.
                    var addAltSvcHeader = !options.DisableAltSvcHeader && _multiplexedTransportFactory != null;

                    // Add the HTTP middleware as the terminal connection middleware
                    if (hasHttp1 || hasHttp2
                        || options.Protocols == HttpProtocols.None) // TODO a test fails because it doesn't throw an exception in the right place
                                                                    // when there is no HttpProtocols in KestrelServer, can we remove/change the test?
                    {
                        if (_transportFactory is null)
                        {
                            throw new InvalidOperationException($"Cannot start HTTP/1.x or HTTP/2 server if no {nameof(IConnectionListenerFactory)} is registered.");
                        }
                       //中间件
                        options.UseHttpServer(ServiceContext, application, options.Protocols, addAltSvcHeader);
                        var connectionDelegate = options.Build();

                        // Add the connection limit middleware
                        connectionDelegate = EnforceConnectionLimit(connectionDelegate, Options.Limits.MaxConcurrentConnections, Trace);

                        options.EndPoint = await _transportManager.BindAsync(options.EndPoint, connectionDelegate, options.EndpointConfig, onBindCancellationToken).ConfigureAwait(false);
                    }

                    if (hasHttp3 && _multiplexedTransportFactory is not null)
                    {
                        options.UseHttp3Server(ServiceContext, application, options.Protocols, addAltSvcHeader);
                        var multiplexedConnectionDelegate = ((IMultiplexedConnectionBuilder)options).Build();

                        // Add the connection limit middleware
                        multiplexedConnectionDelegate = EnforceConnectionLimit(multiplexedConnectionDelegate, Options.Limits.MaxConcurrentConnections, Trace);

                        options.EndPoint = await _transportManager.BindAsync(options.EndPoint, multiplexedConnectionDelegate, options, onBindCancellationToken).ConfigureAwait(false);
                    }
                }

                AddressBindContext = new AddressBindContext(_serverAddresses, Options, Trace, OnBind);

                await BindAsync(cancellationToken).ConfigureAwait(false);
            }
            catch
            {
                // Don't log the error https://github.com/dotnet/aspnetcore/issues/29801
                Dispose();
                throw;
            }

            // Register the options with the event source so it can be logged (if necessary)
            KestrelEventSource.Log.AddServerOptions(Options);
        }
        
          public static IConnectionBuilder UseHttpServer<TContext>(this IConnectionBuilder builder, ServiceContext serviceContext, IHttpApplication<TContext> application, HttpProtocols protocols, bool addAltSvcHeader) where TContext : notnull
        {
            var middleware = new HttpConnectionMiddleware<TContext>(serviceContext, application, protocols, addAltSvcHeader);
            return builder.Use(next =>
            {
                return middleware.OnConnectionAsync;
            });
        }
        
        
            public Task OnConnectionAsync(ConnectionContext connectionContext)
        {
            var memoryPoolFeature = connectionContext.Features.Get<IMemoryPoolFeature>();
            var protocols = connectionContext.Features.Get<HttpProtocolsFeature>()?.HttpProtocols ?? _endpointDefaultProtocols;
            var localEndPoint = connectionContext.LocalEndPoint as IPEndPoint;
            var altSvcHeader = _addAltSvcHeader && localEndPoint != null ? HttpUtilities.GetEndpointAltSvc(localEndPoint, protocols) : null;

            var httpConnectionContext = new HttpConnectionContext(
                connectionContext.ConnectionId,
                protocols,
                altSvcHeader,
                connectionContext,
                _serviceContext,
                connectionContext.Features,
                memoryPoolFeature?.MemoryPool ?? System.Buffers.MemoryPool<byte>.Shared,
                localEndPoint,
                connectionContext.RemoteEndPoint as IPEndPoint);
            httpConnectionContext.Transport = connectionContext.Transport;

            var connection = new HttpConnection(httpConnectionContext);

            return connection.ProcessRequestsAsync(_application);
        }
        
       //HttpConnection
       public async Task ProcessRequestsAsync<TContext>(IHttpApplication<TContext> httpApplication) where TContext : notnull
        {
            try
            {
                // Ensure TimeoutControl._lastTimestamp is initialized before anything that could set timeouts runs.
                _timeoutControl.Initialize(_systemClock.UtcNowTicks);

                IRequestProcessor? requestProcessor = null;

                switch (SelectProtocol())
                {
                    case HttpProtocols.Http1:
                        // _http1Connection must be initialized before adding the connection to the connection manager
                        requestProcessor = _http1Connection = new Http1Connection<TContext>((HttpConnectionContext)_context);
                        _protocolSelectionState = ProtocolSelectionState.Selected;
                        break;
                    case HttpProtocols.Http2:
                        // _http2Connection must be initialized before yielding control to the transport thread,
                        // to prevent a race condition where _http2Connection.Abort() is called just as
                        // _http2Connection is about to be initialized.
                        requestProcessor = new Http2Connection((HttpConnectionContext)_context);
                        _protocolSelectionState = ProtocolSelectionState.Selected;
                        break;
                    case HttpProtocols.Http3:
                        requestProcessor = new Http3Connection((HttpMultiplexedConnectionContext)_context);
                        _protocolSelectionState = ProtocolSelectionState.Selected;
                        break;
                    case HttpProtocols.None:
                        // An error was already logged in SelectProtocol(), but we should close the connection.
                        break;

                    default:
                        // SelectProtocol() only returns Http1, Http2, Http3 or None.
                        throw new NotSupportedException($"{nameof(SelectProtocol)} returned something other than Http1, Http2 or None.");
                }

                _requestProcessor = requestProcessor;

                if (requestProcessor != null)
                {
                    var connectionHeartbeatFeature = _context.ConnectionFeatures.Get<IConnectionHeartbeatFeature>();
                    var connectionLifetimeNotificationFeature = _context.ConnectionFeatures.Get<IConnectionLifetimeNotificationFeature>();

                    // These features should never be null in Kestrel itself, if this middleware is ever refactored to run outside of kestrel,
                    // we'll need to handle these missing.
                    Debug.Assert(connectionHeartbeatFeature != null, nameof(IConnectionHeartbeatFeature) + " is missing!");
                    Debug.Assert(connectionLifetimeNotificationFeature != null, nameof(IConnectionLifetimeNotificationFeature) + " is missing!");

                    // Register the various callbacks once we're going to start processing requests

                    // The heart beat for various timeouts
                    connectionHeartbeatFeature?.OnHeartbeat(state => ((HttpConnection)state).Tick(), this);

                    // Register for graceful shutdown of the server
                    using var shutdownRegistration = connectionLifetimeNotificationFeature?.ConnectionClosedRequested.Register(state => ((HttpConnection)state!).StopProcessingNextRequest(), this);

                    // Register for connection close
                    using var closedRegistration = _context.ConnectionContext.ConnectionClosed.Register(state => ((HttpConnection)state!).OnConnectionClosed(), this);
                    //重点，主要使用是httpconnection去处理
                    await requestProcessor.ProcessRequestsAsync(httpApplication);
                }
            }
            catch (Exception ex)
            {
                Log.LogCritical(0, ex, $"Unexpected exception in {nameof(HttpConnection)}.{nameof(ProcessRequestsAsync)}.");
            }
        }
        
       //httpconnection 继承 HttpProtocol
       public async Task ProcessRequestsAsync<TContext>(IHttpApplication<TContext> application) where TContext : notnull
        {
            try
            {
                // We run the request processing loop in a seperate async method so per connection
                // exception handling doesn't complicate the generated asm for the loop.
                await ProcessRequests(application);
            }
            catch (BadHttpRequestException ex)
            {
                // Handle BadHttpRequestException thrown during request line or header parsing.
                // SetBadRequestState logs the error.
                SetBadRequestState(ex);
            }
            catch (ConnectionResetException ex)
            {
                // Don't log ECONNRESET errors made between requests. Browsers like IE will reset connections regularly.
                if (_requestProcessingStatus != RequestProcessingStatus.RequestPending)
                {
                    Log.RequestProcessingError(ConnectionId, ex);
                }
            }
            catch (IOException ex)
            {
                Log.RequestProcessingError(ConnectionId, ex);
            }
            catch (ConnectionAbortedException ex)
            {
                Log.RequestProcessingError(ConnectionId, ex);
            }
            catch (Exception ex)
            {
                Log.LogWarning(0, ex, CoreStrings.RequestProcessingEndError);
            }
            finally
            {
                try
                {
                    await TryProduceInvalidRequestResponse();
                }
                catch (Exception ex)
                {
                    Log.LogWarning(0, ex, CoreStrings.ConnectionShutdownError);
                }
                finally
                {
                    OnRequestProcessingEnded();
                }
            }
        }
        
        
          private async Task ProcessRequests<TContext>(IHttpApplication<TContext> application) where TContext : notnull
        {
            while (_keepAlive)
            {
                if (_context.InitialExecutionContext is null)
                {
                    // If this is a first request on a non-Http2Connection, capture a clean ExecutionContext.
                    _context.InitialExecutionContext = ExecutionContext.Capture();
                }
                else
                {
                    // Clear any AsyncLocals set during the request; back to a clean state ready for next request
                    // And/or reset to Http2Connection's ExecutionContext giving access to the connection logging scope
                    // and any other AsyncLocals set by connection middleware.
                    ExecutionContext.Restore(_context.InitialExecutionContext);
                }

                BeginRequestProcessing();

                var result = default(ReadResult);
                bool endConnection;
                do
                {
                    if (BeginRead(out var awaitable))
                    {
                        result = await awaitable;
                    }
                } while (!TryParseRequest(result, out endConnection));

                if (endConnection)
                {
                    // Connection finished, stop processing requests
                    return;
                }

                var messageBody = CreateMessageBody();
                if (!messageBody.RequestKeepAlive)
                {
                    _keepAlive = false;
                }

                IsUpgradableRequest = messageBody.RequestUpgrade;

                InitializeBodyControl(messageBody);


                var context = application.CreateContext(this);

                try
                {
                    KestrelEventSource.Log.RequestStart(this);

                    // Run the application code for this request
                    await application.ProcessRequestAsync(context);

                    // Trigger OnStarting if it hasn't been called yet and the app hasn't
                    // already failed. If an OnStarting callback throws we can go through
                    // our normal error handling in ProduceEnd.
                    // https://github.com/aspnet/KestrelHttpServer/issues/43
                    if (!HasResponseStarted && _applicationException == null && _onStarting?.Count > 0)
                    {
                        await FireOnStarting();
                    }

                    if (!_connectionAborted && !VerifyResponseContentLength(out var lengthException))
                    {
                        ReportApplicationError(lengthException);
                    }
                }
                catch (BadHttpRequestException ex)
                {
                    // Capture BadHttpRequestException for further processing
                    // This has to be caught here so StatusCode is set properly before disposing the HttpContext
                    // (DisposeContext logs StatusCode).
                    SetBadRequestState(ex);
                    ReportApplicationError(ex);
                }
                catch (Exception ex)
                {
                    ReportApplicationError(ex);
                }

                KestrelEventSource.Log.RequestStop(this);

                // At this point all user code that needs use to the request or response streams has completed.
                // Using these streams in the OnCompleted callback is not allowed.
                try
                {
                    Debug.Assert(_bodyControl != null);
                    await _bodyControl.StopAsync();
                }
                catch (Exception ex)
                {
                    // BodyControl.StopAsync() can throw if the PipeWriter was completed prior to the application writing
                    // enough bytes to satisfy the specified Content-Length. This risks double-logging the exception,
                    // but this scenario generally indicates an app bug, so I don't want to risk not logging it.
                    ReportApplicationError(ex);
                }

                // 4XX responses are written by TryProduceInvalidRequestResponse during connection tear down.
                if (_requestRejectedException == null)
                {
                    if (!_connectionAborted)
                    {
                        // Call ProduceEnd() before consuming the rest of the request body to prevent
                        // delaying clients waiting for the chunk terminator:
                        //
                        // https://github.com/dotnet/corefx/issues/17330#issuecomment-288248663
                        //
                        // This also prevents the 100 Continue response from being sent if the app
                        // never tried to read the body.
                        // https://github.com/aspnet/KestrelHttpServer/issues/2102
                        //
                        // ProduceEnd() must be called before _application.DisposeContext(), to ensure
                        // HttpContext.Response.StatusCode is correctly set when
                        // IHttpContextFactory.Dispose(HttpContext) is called.
                        await ProduceEnd();
                    }
                    else if (!HasResponseStarted)
                    {
                        // If the request was aborted and no response was sent, there's no
                        // meaningful status code to log.
                        StatusCode = 0;
                    }
                }

                if (_onCompleted?.Count > 0)
                {
                    await FireOnCompleted();
                }

                application.DisposeContext(context, _applicationException);

                // Even for non-keep-alive requests, try to consume the entire body to avoid RSTs.
                if (!_connectionAborted && _requestRejectedException == null && !messageBody.IsEmpty)
                {
                    await messageBody.ConsumeAsync();
                }

                if (HasStartedConsumingRequestBody)
                {
                    await messageBody.StopAsync();
                }
            }
        }
        
        
       //关键的Microsoft.AspNetCore.Hosting HostingApplication ，它整合了中间件，Server层的HttpProtocol,
         // Set up the request
        public Context CreateContext(IFeatureCollection contextFeatures)
        {
            Context? hostContext;
            if (contextFeatures is IHostContextContainer<Context> container)
            {
                hostContext = container.HostContext;
                if (hostContext is null)
                {
                    hostContext = new Context();
                    container.HostContext = hostContext;
                }
            }
            else
            {
                // Server doesn't support pooling, so create a new Context
                hostContext = new Context();
            }

            HttpContext httpContext;
            if (_defaultHttpContextFactory != null)
            {
                var defaultHttpContext = (DefaultHttpContext?)hostContext.HttpContext;
                if (defaultHttpContext is null)
                {
                    httpContext = _defaultHttpContextFactory.Create(contextFeatures);
                    hostContext.HttpContext = httpContext;
                }
                else
                {
                    _defaultHttpContextFactory.Initialize(defaultHttpContext, contextFeatures);
                    httpContext = defaultHttpContext;
                }
            }
            else
            {
                httpContext = _httpContextFactory!.Create(contextFeatures);
                hostContext.HttpContext = httpContext;
            }

            _diagnostics.BeginRequest(httpContext, hostContext);
            return hostContext;
        }

        // Execute the request
        public Task ProcessRequestAsync(Context context)
        {
            return _application(context.HttpContext!);
        }
````














