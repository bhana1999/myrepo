 const userModel = require("../models/userModel")
  
const createuser = async function (req, res) {
    try {
    const data = req.body
    const{title,name,phone,email,password,}=req.body
    if(!title){res.status(400).send({status:false,message:"title is missing"})}
    if(!name){res.status(400).send({status:false,message:"name is missing"})}
    if(!phone){res.status(400).send({status:false,message:"phone is missing"})}
    if(!password){res.status(400).send({status:false,message:"password is missing"})}
    
    const find1 = await userModel.findOne({phone:phone})
    if(find1){res.status(400).send({status:false,message:"phone number already exists"})}

    const find2 = await userModel.findOne({email:email})
    if(find2){res.status(400).send({status:false,message:"email already exists"})}

    const createuser = await userModel.create(data);
    return res.status(201).send({ status: true, data: createuser })
}
catch (err) {
  return res.status(500).send({ status: false, message: err.message })
}
}