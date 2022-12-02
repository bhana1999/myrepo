const jwt=require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const bookModel = require('../models/bookModel')
// const bookModel=require('../Model/bookModel')
// let mongoose= require('mongoose')


const authentication=async function(req,res,next){
    try{
        let token=req.headers["x-api-key"]
        if(!token) return res.status(400).send({status:false,error:"Token must be present"})
        try{
        var decodedToken=jwt.verify(token,"lithiumproject3")
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

const Authorization = async function (req,res,next){
    try{

         let userLoggedIn = req.token.userid
       
        let bookid = req.params.bookId

         let isvalid = isValidObjectId(bookid)

        if (isvalid){
        let book = await bookModel.findById(bookid)
        // console.log(book)
        if(!book){res.status(404).send({status:false,msg:"book does not exit"})}

        if(book.userId.toString() != userLoggedIn) return res.status(403).send({status: false, message: 'User logged is not allowed to create/delete/modify this book data'})
        
        }
    }catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }

    next()
}

module.exports.Authorization =Authorization

module.exports.authentication=authentication