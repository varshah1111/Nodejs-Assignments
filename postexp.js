const https = require('https');

const data = JSON.stringify({
  title: 'Example for post',
  body: 'Node js HTTP methods',
  userId: 1
});

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/posts',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let responseBody = '';

  res.on('data', chunk => responseBody += chunk);
  res.on('end', () => {
    console.log('Response:', JSON.parse(responseBody));
  });
});

req.on('error', error => console.error(error));
req.write(data);
req.end();