const http=require('http');
const {URL} =require('url');
const todos=[{
    id:1,
    task:'httpmethod',
    completed:'false'
},{id:2,
    task:'neopat',
    completed:'false'}]
const server=http.createServer((req,res)=>{
    const {method,url}=req;
    const parsedurl=new URL(url,`https://${req.headers.url}`);
    const pathname=parsedurl.pathname
    if(method==='GET' && pathname==='/todos'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(JSON.stringify(todos));
    }
    else if(method==='POST' && pathname==='/todos'){
        let body=''
        req.on('data',chunks=>{
            body+=chunks.toString();
        })
        req.on('end',()=>{
            try{
            const newtodo=JSON.parse(body);
            newtodo.id=todos.length+1;
            todos.push(newtodo);
            res.writeHead(200,{'Content-type':'application/json'})
            res.end(JSON.stringify(newtodo));
        }
        catch(error){
            res.writeHead(400)
            res.end(JSON.stringify({error:'Invalid JSON'}));
        }
        })
        
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
      }
})
server.listen(3000, () => {
    console.log('Simple TODO API running at http://localhost:3000/');
  });