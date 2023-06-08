import http from 'http';
import url from 'url';

const PORT = process.env.PORT || 4300;

const server = http.createServer((req, resp) => {
  function calculator(a: number, b: number) {
    const add: number = a + b;
    const substract: number = a - b;
    const multiply: number = a * b;
    const divide: number = a / b;

    return { add, substract, multiply, divide };
  }

  if (!req.url) {
    server.emit('error', new Error('Error 404'));
    resp.write(`<h1>Error 404</h1>`);
    return;
  }

  const { pathname } = url.parse(req.url);

  if (pathname !== '/calculator') {
    server.emit('error', new Error('Path not found'));
    resp.write(`<h1>Error 404</h1><h2>Path not found</h2>`);
    return;
  }

  resp.end();
});

server.on('error', () => {});

server.on('listening', () => {
  console.log('Listening in http://localhost:' + PORT);
});

server.listen(PORT);
