const net = require("net")

class Request {
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.headers = options.headers || {};
        this.body = options.body || {}

        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        this.path = options.path || "/";
        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key=>`${key}:${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`}

    send2(connection) {
        return new Promise((resolve, reject) => {
            if (connection){
                connection.write(this.toString());
            }            
            else {
                console.log(this.toString())
                connection = net.createConnection({
                    host: this.host,
                    port: this.post
                }, () => {
                    console.log(this.toString());
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                resolve(data.toString());
                connection.end();
            });
            connection.on('end', () => {
                console.log('disconnected from server');
            });
            connection.on('error', (error) => {
                reject(error)
                connection.end();
            });

        });
    }

    send(connection) {
        return new Promise((resolve, reject) => {
          if (connection) {
            connection.write(this.toString())
          } else {
            connection = net.createConnection(
              {
                host: this.host,
                port: this.port,
              },
              () => {
                connection.write(this.toString())
              }
            )
          }
          connection.on('data', (data) => {
            resolve(data.toString())
            connection.end()
          })
          connection.on('error', (err) => {
            reject(err)
            connection.end()
          })
        })
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
            hello:"冯"
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

    client.write(`POST / HTTP/1.1
X-Foo2:customized
Content-Type:application/x-www-form-urlencoded
Content-Length:27

name=winter&hello=%E5%86%AF`);   
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