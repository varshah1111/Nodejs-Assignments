const express=require('express')
const app=express()
const port=8000
app.get('/usn/:id/user/:name',(req,res)=>{
    res.send(`USN: ${req.params.id} and User: ${req.params.name}`)
})
app.listen(port,()=>{
    console.log(`Running in port http://localhost:${port}`)
})