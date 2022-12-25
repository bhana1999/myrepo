const cardModel = require("../model/cardModel");
const mongoose = require("mongoose")
const{isValidObjectIds}= require("../validators/validator.js")


const createcard = async function(req,res){
    try{
    let data = req.body
    if(Object.keys(data).length==0){
        return res.status(400).send({status:false,msg:"provide data to create card"})
    }
    if(!isValidCardNumber(data.cardNumber)) return res.status(400).send({status:true,msg:"provide valid card number"})
    let cardexists=await cardModel.findOne({cardNumber:data.cardNumber,status:"ACTIVE"})
    if(oldcart)return res.status(400).send({status:false,msg:"this card already exists"})
  

   if(data.cardType!=="REGULAR" || data.cardType=="SPECIAL"){
    return res.status(400).send({status:false,msg:"provide valid cardType it should be  REGULAR & SPECIAL"})}



    if(!isValidString(data.customerName)) return res.status(400).send({status:false,msg:"provide valid customerName"})
    if(data.status){
    if(data.status!=="ACTIVE" || data.status=="INACTIVE"){
        return res.status(400).send({status:false,msg:"provide valid status"})}
            }
     if(!isValidObjectId(data.customerID)) return res.status(400).send({status:false,msg:"provide valid cutomerId"})
            
        
            const card=await cardModel.create(data)
    return res.status(201).send({status:true,data:card})
}
catch(error){
    return res.status(500).send({status:true,msg:error.message})
}
}

const getcard = async function(req,res){
    try{
    let data = req.query
    const card = await cardModel.find(data).populate("customerID")
    return res.send({status:true,message:card})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})

    }
}

module.exports={createcard,getcard}