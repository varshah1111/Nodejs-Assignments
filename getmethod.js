const http=require('http')
const server=http.createServer((req,res)=>{
    const{url,method}=req;
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end(`This is ${method} with url ${url}`);
}).listen(8080);