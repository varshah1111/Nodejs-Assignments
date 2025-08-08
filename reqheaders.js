const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request Headers:', req.headers);

  const userAgent = req.headers['user-agent'];
  const acceptLanguage = req.headers['accept-language'];
  const title=req.headers['accept-encoding'];
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}\nAccept-Encoding: ${title}`);
});

server.listen(3000);