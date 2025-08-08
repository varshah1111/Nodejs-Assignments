const express=require('express')
const app=express()
const port=8080
app.get('/',(req,res)=>{
    res.send("This is an example for express js")
})
app.listen(port,()=>{
    console.log(`Server running in http://localhost:${port}`)
})