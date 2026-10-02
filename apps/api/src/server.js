import http from "node:http";
import { version } from 'node:process';
const hostname = "127.0.0.1";
const port = 8000;

const devices = [
  { id: 1, name: "device1", status: "offline" },
  { id: 2, name: "device2", status: "offline" }];


const server = http.createServer((req, res) => {


  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain', 'charset=utf-8');
    console.log('url:', req.url, '\nmethod:', req.method);
    res.end("Hi! \nreq URL is:" + req.url);
  }
  else if (req.url === '/devices' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json','charset=utf-8');
    console.log('url:', req.url, '\n method:', req.method);
    res.end(JSON.stringify(devices));
  }
  else if (req.url === '/devices/add' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain', 'charset=utf-8');

    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      console.log(data);
      res.end("Данные получены");
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain','charset=utf-8');
    res.end("Not Found \n");
  }
});

server.listen(port, hostname, () => {
  console.log(`Version: ${version}`);
});
