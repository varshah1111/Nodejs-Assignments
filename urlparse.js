const http=require('http')
const url=require('url')
const server=http.createServer((req,res)=>{
    const parsedurl=url.parse(req.url,true)
    const pathname=parsedurl.pathname;
    const query=parsedurl.query;
    res.writeHead(200,{'Content-type':'application/json'})

    res.end(JSON.stringify({
        pathname,
        query,
        fullurl:req.url
    },null,2))
}).listen(3030);
