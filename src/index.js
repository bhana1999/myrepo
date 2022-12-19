const express = require("express")
const route = require('./routes/route')
const mongoose = require('mongoose')

const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://ashi:jhansi284205@myfirstcluster.tfihevu.mongodb.net/project5",
{useNewUrlParser:true})

.then(()=>console.log("mongodb connected"))
.catch(err => console.log(err))

app.use('/',route)

app.use((req,res)=>{
    res.status(404).send({status:false,msg:"request not found"})
})

app.listen(process.env.PORT || 3000,function(){
    console.log('express app running on port '+ (process.env.PORT || 3000))
})

