const express = require("express")
const{default:mongoose} = require("mongoose")
const port = 3000
const multer = require("multer")
const app = express()
const route = require("./routes/route")

app.use(express.json()) //express has inbuilt function to parse data.

// app.use(multer().any())

mongoose.connect("mongodb+srv://AbhinavSIngh:9936522959@cluster0.wtmx5b4.mongodb.net/group13Database", { useNewUrlParser: true })

.then(()=> console.log("MongoDb is connected"))
.catch( err => console.log(err))



app.use('/', route)

app.use(function(req,res){
    res.status(404).send({status:false,message:"incorrect url"})
})

app.listen(port,function(){
    console.log("express app running on the port 3000")
})