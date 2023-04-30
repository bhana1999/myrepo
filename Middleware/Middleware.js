const jwt=require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const usermodel = require('../Models/usermodel')

// let mongoose= require('mongoose')
//-----------------------------Authentication function-------------------------

const authentication=async function(req,res,next){
    try{
        let token=req.headers["x-api-key"]
        if(!token) return res.status(400).send({status:false,error:"Token must be present"})
        try{
        var decodedToken=jwt.verify(token,"secretkey")
        }catch(err){
         return res.status(401).send({status:false,message:err.message})
        }
        req.token=decodedToken
       
        next()
    }
    catch(error){
        return res.status(500).send({status:false, error:error.message})
    }
}




module.exports.authentication=authentication // exporting function
