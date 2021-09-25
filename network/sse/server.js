'use strict';

const http = require('http');

http.createServer((req, res) => {

  // 服务器声明接下来发送的是事件流
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  // 发送消息
  setInterval(() => {
    res.write('event: slide\n'); // 事件类型
    res.write(`id: ${+new Date()}\n`); // 消息 ID
    res.write('data: 7\n'); // 消息数据
    res.write('retry: 10000\n'); // 重连时间
    res.write('\n\n'); // 消息结束
  }, 3000);

  // 发送注释保持长连接
  setInterval(() => {
    res.write(': \n\n');
  }, 12000);
}).listen(2000);