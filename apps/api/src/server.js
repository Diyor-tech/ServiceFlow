//imports and settings
import http from "node:http";
import { version } from 'node:process';
const hostname = "127.0.0.1";
const port = 8000;
//variables
const devices = [
  { id: 1, name: "device1", status: "offline" },
  { id: 2, name: "device2", status: "offline" }];

//start
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log('url:', req.url, '\nmethod:', req.method);
    res.end("Hi! \nreq URL is:" + req.url);
  }
  else if (req.url === '/devices' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log('url:', req.url, '\n method:', req.method);
    res.end(JSON.stringify(devices));
  }
  else if (req.url === '/devices' && req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    let body = "";
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const newDevice = JSON.parse(body);
        const createdDevice = { ...newDevice, id: devices.length + 1 };
        devices.push(createdDevice);
        res.statusCode = 201;
        console.log("Devices now:", devices);
        res.end(JSON.stringify(createdDevice));
        console.log('post result is:', createdDevice);
      }
      catch (e) {
        res.statusCode = 400;

        console.log("JSON parse error:", e.message);
        const errorResponse = {
            error: "Bad Request",
            message: "Invalid JSON"
          };

        res.end(JSON.stringify(errorResponse));
      }
    })
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Not Found \n");
  }
});

server.listen(port, hostname, () => {
  console.log(`Version: ${version}`);
});
