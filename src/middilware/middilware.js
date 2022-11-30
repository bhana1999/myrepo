const jwt=require('jsonwebtoken')
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

        let isvalid = mongoose.Types.ObjectId.isValid(blogid)

        if (isvalid){

        let book = await bookModel.findById(blogid)

        if(!book){res.status(404).send({status:false,msg:"book does not exit"})}

        if(book.userid != userLoggedIn) return res.status(401).send({status: false, msg: 'User logged is not allowed to create or modify  book data'})
        
        }
    }catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }

    next()
}

module.exports.Authorization =Authorization

module.exports.authentication=authentication