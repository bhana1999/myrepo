const { isValidObjectId } = require("mongoose")
const bookModel = require("../models/bookModel")
const BookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const validators = require("../validator/validator")


const createReview = async function(req,res){
    try{
    const data = req.body
    if(!data) return res.status(400).send ({status:false,messaage: "data is not present in the request body"})
    
    let {reviewedBy,reviewedAt,rating,review} = data
    
    let bId = req.params.bookId
    data.bookId=bId
    data.isDeleted
    
     if(!bId) return res.status(400).send({status:false,massage: "bookId is required"})
     if(!isValidObjectId(bId)) return res.status(400).send ({status:false,massage:"bookId is not a valid ObjectId"})
  
     let book = await bookModel.findOneAndUpdate({_id:bId,isDeleted:false},{$inc:{review:1}},{new:true}).lean()
    if(!book) return res.status(404).send({status:false,message:"no books found"})
  
     if(!reviewedBy) return res.status(400).send ({status:false,message:"reviewedBy is required"})
     if(!validators.isvalidName(reviewedBy)) return res.status(400).send ({status:false,message:"please provide a validName in reviewedBy"})
      
     if(!reviewedAt) return res.status(400).send({status:false,message:"reviewedAt is required"})
     if(!validators.isvalidDate(reviewedAt)) return res.status(400).send({status:false,message: "reviewedAt is not a valid date type"})
  
     if(!rating) return res.status(400).send ({status:false,mesage:"rating is required"})
     if(typeof rating!="number"||rating<1||rating>5) return res.status(400).send ({status:false,mesage:"invalid rating"})
     
  
     if(!review) return res.status(400).send ({status:false, message : "review is required"})
     if(!validators.isvalidReview(review)) return res.status(400).send ({status:false,mesage:"invalid review"})
     const savedData = await reviewModel.create(data)
     let reviewsData = await reviewModel.find({bookId:bId})

     book.reviewsData=reviewsData
 
     res.status(200).send({status:true,message:"Book List",data:book})
  
    }
    catch(error){
      return res.status(500).send({status:false, message:error.message})
    }
  }

const updateReview = async function(req,res){
try{
    let bId = req.params.bookId
    if(!bId) return res.status(400).send({status:false,message:"book id not available"})
    if(!isValidObjectId(bId)) return res.status(400).send({status:true,message:"invalid bookid"})

    let rId = req.params.reviewId
    if(!rId) return res.status(400).send({status:true,message:"reviewid not available"})
    if(!isValidObjectId(bId)) return res.status(400).send({status:false,message:"invalid reviewid"})

    let data = req.body
    let arr = Object.keys(data)
    if(arr.length==0) return res.status(400).send({status:false,message:"can not provide empty body"})

    // for(i of arr){
    //     if(i=="rating"){
    //         if(!validators.isvalidRating(data[i])) return res.status(400).send({status:false,message:`invalid ${i} format`})
    //     }
    //     if(i=="review"){
    //     if(!validators.isvalidReview(data[i])) return res.status(400).send({status:false,message:`invalid ${i} format`})
    //     }
    //     if(!validators.isvalidName(data[i])) return res.status(400).send({status:false,message:`invalid ${i} format`})
    // }

    let book = await bookModel.findOneAndUpdate({_id:bId,isDeleted:false},{$inc:{review:1}},{new:true}).lean()
    if(!book) return res.status(404).send({status:false,message:"no books found"})

    let review =  await reviewModel.findOneAndUpdate({_id:rId,isDeleted:false},data)
    if(!review) return res.status(404).send({status:false,message:"no review found"})

    let reviewsData = await reviewModel.find({bookId:bId})

    book.reviewsData=reviewsData

    res.status(200).send({status:true,message:"Book List",data:book})
}catch(error){
    res.status(500).send({status:false,message:error.message})
}



}

const deleteReview = async function(req, res){
    try{

        bookId = req.params.bookId
        reviewId = req.params.reviewId

        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "book id is not valid" })
        }

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "book id is not in valid format" })
        }

        const checkbookIdExist = await bookModel.findById({ _id: bookId })
        if (!checkbookIdExist) {
            return res.status(400).send({ status: false, msg: "book you are searching does not exist" })
        }

        if (checkbookIdExist.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "book is already deleted" })
        }

        if (!isValid(reviewId)) {
            return res.status(400).send({ status: false, msg: " review id is not valid" })
        }

        if (!isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, msg: "review id is not in valid format" })
        }

        const checkReviewIdExist = await reviewModel.findById({ _id: reviewId })
        if (!checkReviewIdExist) {
            return rse.status(400).send({ status: false, msg: "review does not exist" })
        }

        if (checkReviewIdExist.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "review is already deleted" })
        }



       const deletedReview = await reviewModel.findOneAndUpdate(
           {_id : reviewId,bookId:bookId},
           {$set : {isDeleted:true}}


       )

       if(!deletedReview){
           return res.status(400).send({status :false, msg : "review id is not associated with book id" })
       }

       const decreaseReviewValue = await bookModel.findOneAndUpdate(
           {_id : bookId},
           {$inc : {reviews : -1}},
           {new : true}
       )

       return res.status(200).send({status : true, msg : "review deleted", data:decreaseReviewValue })

       
        

    }catch(err){
        return res.status(500).send({status :false, msg : err.message})
    }
}

module.exports={updateReview,deleteReview,createReview}