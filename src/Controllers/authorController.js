const authormodel = require("../Models/authormodel")
const jwt  = require("jsonwebtoken")


const createauthor = async function (req,res){

    try {
        
        let data = req.body;
        let newdata = await authormodel.create(data);
    
       return res.status(201).send ({msg: newdata})
    } 
    catch (error) {
        res.status(500).send({msg:error.message})
    }
}

const loginauthor = async function (req,res){

try {

    let email = req.body.email
    let password = req.body.password

    if (Object.keys(req.body).length == 0){
        return res.status(400).send({status:false , msg: "email and password is required"})
    }

    let authordata = await authormodel.findOne({email:email},{password:password})

    if (!authordata) return res.status(404).send({status:false,msg:"author not found"})

    let token = jwt.sign({authorid:authordata._id.toString(),team : "breakoutroom 19"}, "lithiumproject1");

    res.setHeader("x-api-key",token)

  return  res.status(200).send({statu : true, token : token })

} catch (error) {

   return res.status(500).send(error.message)
}

}


    
module.exports = {createauthor,loginauthor}



