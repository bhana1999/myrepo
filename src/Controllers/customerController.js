const customerModel = require("../model/customerModel");
const mongoose = require("mongoose")

const createcustomer = async function (req, res) {
    try{
    data = req.body
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data" });
    const{emailID, mobileNumber ,customerID, } = data
    if(!emailID) return res.status(400).send({status:false,message:"email is required"})
    if(!isvalidEmail(emailID)) return res.status(400).send({status:false,message:"please provide a valid email"})

     if(!mobileNumber) return res.status(400).send({status:false,message:"please provide monile number"})
    if(!isvalidMobileNumber(mobileNumber)) return res.status(400).send({status:false,message:"please provide valid mobile number!"})
    const customer = await customerModel.create(data)
    return  res.status(201).send({status:true,message:"customer created succesfully",Data:customer})
    }catch (err) {
        return res.status(500).send({ status: false, message: err.message });
      }
}
 

const getcustomer = async function(req,res){
    try{
        let customers = await BookModel.find({status:Active})
    return res.status(200).send({status:true,message:customer})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const deletecustomer = async function(req,res){
    try{
    let customerId = req.params.customerId
    const customer = await customerModel.findOneAndUpdate({_id:customerId},{ status: INACTIVE }, { new: true })
   return res.status(200).send({ status: true, message: " customer is deleted " })
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }

}
module.exports={createcustomer,getcustomer,deletecustomer}