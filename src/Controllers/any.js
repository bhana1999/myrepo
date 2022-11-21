const authormodel = require("../Models/authormodel")
const router = require("../routes/route")

const data = await blogModel.findOneAndUpdate({email:email} , $set{email:newemail})

const login = async function(req,res){

    const email = req.body.email
    const password = req.body.password

    const data = await authormodel.findone({email:email,password: password})
    let token = jwt.sign({authorid:data.authorid} ,"ABC")
    

}