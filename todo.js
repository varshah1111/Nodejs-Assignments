const http = require('http');
const { URL } = require('url');

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build a simple API', completed: false }
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

//   // CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Content-Type', 'application/json');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (method === 'GET' && pathname === '/todos') {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }

  else if (method === 'POST' && pathname === '/todos') {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const newTodo = JSON.parse(body);
        newTodo.id = todos.length + 1;
        todos.push(newTodo);
        res.writeHead(201);
        res.end(JSON.stringify(newTodo));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  else if (method === 'PUT' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2]);
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const updatedTodo = JSON.parse(body);
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          todos[index] = { id, ...updatedTodo };
          res.writeHead(200);
          res.end(JSON.stringify(todos[index]));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Todo not found' }));
        }
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  else if (method === 'PATCH' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2]);
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const updates = JSON.parse(body);
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
          Object.assign(todo, updates);
          res.writeHead(200);
          res.end(JSON.stringify(todo));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Todo not found' }));
        }
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2]);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      const deleted = todos.splice(index, 1)[0];
      res.writeHead(200);
      res.end(JSON.stringify(deleted));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Todo not found' }));
    }
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Simple TODO API running at http://localhost:3000/');
});
