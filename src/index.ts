import http from 'http';
import url from 'url';

const PORT = process.env.PORT || 4300;

const server = http.createServer((request, response) => {
  function calculator(a: any, b: any) {
    const num1 = Number(a);
    const num2 = Number(b);
    const add: number = num1 + num2;
    const substract: number = num1 - num2;
    const multiply: number = num1 * num2;
    const divide: number = num1 / num2;

    return { add, substract, multiply, divide };
  }

  if (!request.url) {
    server.emit('error', new Error('Error 404'));
    response.write(`<h1>Error 404</h1>`);
    return;
  }

  const { pathname, search } = url.parse(request.url);

  if (pathname !== '/calculator') {
    server.emit('error', new Error('Path not found'));
    response.write(`<h1>Error 404</h1><h2>Path not found</h2>`);
    return;
  }

  if (pathname === '/calculator') {
    const urlParams = new URLSearchParams(search!);
    const num1 = urlParams.get('a');
    const num2 = urlParams.get('b');

    const answers = calculator(num1!, num2!);
    response.write(`<h1>CALCULATOR RESULTS</h1>
      <p>${num1} + ${num2} = ${answers.add}</p>
      <p>${num1} - ${num2} = ${answers.substract}</p>
      <p>${num1} * ${num2} = ${answers.multiply}</p>
      <p>${num1} / ${num2} = ${answers.divide}</p>
    `);
  }

  response.end();
});

server.on('error', () => {});
server.listen(PORT);
