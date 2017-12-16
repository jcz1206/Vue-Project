/*
const express = require('express')  
const app = express()  
app.use('/',(req,res) => {  
  res.send('hello express!')  
})  
app.listen(3000,() => {  
    console.log('app listening on port 3000.')  
})  
*/

const express = require('express')  
const path = require('path')  
const app = express()  
  
app.use(express.static(path.join(__dirname, 'dist')))  
app.listen(3000,() => {  
    console.log('app listening on port 3000.')  
}) 