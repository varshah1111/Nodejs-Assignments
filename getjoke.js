const https = require('https');

https.get('https://jsonplaceholder.typicode.com/posts', (res) => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const posts = JSON.parse(data); // posts is an array
      // Print the first post
      console.log(`Post: ${posts[0].title} - Boby: ${posts[0].body}`);
    } catch (err) {
      console.error("Error parsing JSON:", err.message);
    }
  });
}).on('error', (err) => {
  console.error("Request failed:", err.message);
});
