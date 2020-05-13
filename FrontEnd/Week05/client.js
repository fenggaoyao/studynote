const net = require("net")

class Request {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.headers = options.header || {};
        this.body = options.body || {}

        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        this.path = options.path || "/";
        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(options.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(options.body).map(key => `${key}=${encodeURIComponent(options.body[key])}`).join('&')
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key=>`${key}:${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`;
    }

    send(connetion) {
        return new Promise((resolve, reject) => {
            if (connetion)
                connetion.write(this.toString());
            else {
                console.log(this)
                connetion = net.createConnection({
                    host: this.host,
                    port: this.post
                }, () => {
                    console.log(this.toString());
                    connetion.write(this.toString());
                });
            }
            connetion.on('data', (data) => {
                resolve(data.toString());
                connetion.end();
            });
            connetion.on('end', () => {
                console.log('disconnected from server');
            });
            connetion.on('error', (error) => {
                console.log("ff", error)
                connetion.end();
            });

        });
    }

}

class Response {

}

void(async function () {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-Foo2']: 'customized',
        },
        body: {
            name: 'winter',
        },
    })

    let response = await request.send()
    console.log(response)
})()

/*
const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088
}, () => {
    // 'connect' listener.
    console.log('connected to server!');

    client.write(`POST / HTTP/1.1\r
    Content-Type: application/x-www-form-urlencoded\r
    Content-Length: 11\r
    \r
    name=winter`);   
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});
client.on('error', (error) => {
    console.log(error);
    client.end();
});
*/