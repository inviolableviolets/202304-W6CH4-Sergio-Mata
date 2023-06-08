import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  if (req.url !== '/calculator') {
    res.write(`<h1>ERROR</h1><h2>Path not found</h2>`);
    // Server.emit('error', new Error('No url in the request'));
    return;
  }

  const { pathname } = url.parse(req.url);

  res.write(`<h1>CALCULATOR RESULTS</h1>
   <h2>${pathname!.toUpperCase()}</h2>`);
  res.write(req.method);
  res.write(req.url);
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
