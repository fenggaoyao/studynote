class ApplicationBuilder {
    constructor() {
        this._middlewares = [];
    }
    build() {
        this._middlewares.reverse();
        return (httpContext) => {
            let next = _ => {
                _.response.statusCode = 404;
            }
            for (let middleware of this._middlewares) {
                next = middleware(next);
            }
            return next(httpContext);
        }
    }
    use(middleware) {
        this._middlewares.push(middleware);
        return this;
    }
}


class Server {
    constructor(httpHandle, httpContext) {
        this.httpHandle = httpHandle;
        this.httpContext = httpContext
    }
    run() {
        this.httpHandle(this.httpContext)
        console.log(this.httpContext)
    }
}

class WebHostBuilder {
    constructor(configure, context) {
        this.app = new ApplicationBuilder();
        configure(this.app);
        this.context = context
    }
    build() {
        return new Server(this.app.build(), this.context);
    }
}


const foo = (next) => (context) => {
    console.log("foo");
    context.response.body += "foo"
    next(context)
    console.log("foo end");
}

const bar = (next) => (context) => {
    console.log("bar");
    context.response.body += " bar"
    next(context)
    console.log("bar end");
}

const baz = (next) => (context) => {
    console.log("baz");
    context.response.body += " baz"
    context.response.statusCode = 200
    console.log("baz end");
}

const context = {
    request: {
        url: "",
        headers: "",
        body: ""
    },
    response: {
        body: "",
        statusCode: ""
    }
}

new WebHostBuilder(app => app.use(foo).use(bar).use(baz), context).build().run();