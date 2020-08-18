const net = require("net")
const parser=require("./parser.js")

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

    send(connection) {
        return new Promise((resolve, reject) => {
            let parser=new ResponseParse();
            if (connection){
                connection.write(this.toString());
            }            
            else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                console.log(data.toString())   
                parser.receive(data.toString()); 
                // console.log(parser.headers)
                // console.log(parser.statusLine)
                if(parser.isFinished){
                    resolve(parser.response) ;
                }                 
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

}
class Response {

}

class ResponseParse{
    constructor() {
        this.WAITING_STATUS_LINE = 0
        this.WAITING_STATUS_LINE_END = 1
        this.WAITING_HEADER_NAME = 2
        this.WAITING_HEADER_SPACE = 3
        this.WAITING_HEADER_VALUE = 4
        this.WAITING_HEADER_LINE_END = 5
        this.WAITING_HEADER_BLOCK_END = 6
        this.WAITING_BODY = 7
    
        this.current = this.WAITING_STATUS_LINE
        this.statusLine = ''
        this.headers = {}
        this.headerName = ''
        this.headerValue = ''
        this.bodyParser = null
      }
    
      get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished
      }
    
      get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
        return {
          statusCode: RegExp.$1,
          statusText: RegExp.$2,
          headers: this.headers,
          body: this.bodyParser.content.join(''),
        }
    }
    receive(string) {
        for (let i = 0; i < string.length; i++) {        
          if (!this.isFinished) {
            this.receiveChar(string.charAt(i))
          }
        }
      }
    
      receiveChar(char) {
        if (this.current === this.WAITING_STATUS_LINE) {
          if (char === '\r') {
            this.current = this.WAITING_STATUS_LINE_END
          } else {
            this.statusLine += char
          }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
          if (char === '\n') {
            this.current = this.WAITING_HEADER_NAME
          }
        } else if (this.current === this.WAITING_HEADER_NAME) {
          if (char === ':') {
            this.current = this.WAITING_HEADER_SPACE
          } else if (char === '\r') {
            this.current = this.WAITING_HEADER_BLOCK_END
            if (this.headers['Transfer-Encoding'] === 'chunked') {
              this.bodyParser = new TrunkedBodyParser()
            }
          } else {
            this.headerName += char
          }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
          if (char === ' ') {
            this.current = this.WAITING_HEADER_VALUE
          }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
          if (char === '\r') {
            this.current = this.WAITING_HEADER_LINE_END
            this.headers[this.headerName] = this.headerValue
            this.headerName = ''
            this.headerValue = ''
          } else {
            this.headerValue += char
          }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
          if (char === '\n') {
            this.current = this.WAITING_HEADER_NAME
          }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
          if (char === '\n') {
            this.current = this.WAITING_BODY
          }
        } else if (this.current === this.WAITING_BODY) {
          this.bodyParser.receiveChar(char)
        }
      }
}

class TrunkedBodyParser {
    constructor() {
      this.WAITING_LENGTH = 0
      this.WAITING_LENGTH_LINE_END = 1
      this.READING_TRUNK = 2  
      this.WAITING_NEW_LINE = 3
      this.WAITING_NEW_LINE_END = 4
      this.length = 0
      this.content = []
      this.isFinished = false
      this.current = this.WAITING_LENGTH
    }
    receiveChar(char) {
    //  console.log(JSON.stringify(char))
    //  console.log(this.current)    
      if (this.current === this.WAITING_LENGTH) {
        if (char === '\r') {
          if (this.length === 0) {
            console.log("isFinish");
            this.isFinished = true
          }
          this.current = this.WAITING_LENGTH_LINE_END
        } else {          
           this.length *= 16       
           this.length += parseInt(char,16)   
        }
      } else if (this.current === this.WAITING_LENGTH_LINE_END) {
        if (char === '\n') {
          this.current = this.READING_TRUNK
        }
      } else if (this.current === this.READING_TRUNK) {
        this.content.push(char)
        this.length--
        if (this.length === 0) {
          this.current = this.WAITING_NEW_LINE
        }
      } else if (this.current === this.WAITING_NEW_LINE) {
        if (char === '\r') {
          this.current = this.WAITING_NEW_LINE_END
        }
      } else if (this.current === this.WAITING_NEW_LINE_END) {
        if (char === '\n') {
          this.current = this.WAITING_LENGTH
        }
      }
    }
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
    parser.parserHtml(response)
    
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