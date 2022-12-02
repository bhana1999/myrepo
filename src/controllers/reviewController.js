const { isValidObjectId } = require("mongoose")
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const validators = require("../validator/validator")


const createReview = async function(req,res){
    try{
    const data = req.body
    if(!data) return res.status(400).send ({status:false,messaage: "data is not present in the request body"})
    
    let {reviewedBy,rating,review} = data
    
    let bId = req.params.bookId
    data.bookId=bId  //bookId key m bid save kra rhe h bna rhe h
    data.isDeleted
    data.reviewedAt=Date.now()
    
     if(!bId) return res.status(400).send({status:false,massage: "bookId is required"})
     if(!isValidObjectId(bId)) return res.status(400).send ({status:false,massage:"bookId is not a valid ObjectId"})
  
     if(validators.isvalidEmpty(reviewedBy))  return res.status(400).send ({status:false,message:"reviewedBy is emptystring"})
     if(!validators.isvalidName(reviewedBy)) return res.status(400).send ({status:false,message:"please provide a validName in reviewedBy"})
      
     if(!rating) return res.status(400).send ({status:false,mesage:"rating is required"})
     if(typeof rating!="number"||rating<1||rating>5) return res.status(400).send ({status:false,mesage:"invalid rating"})
     
     if(!review) return res.status(400).send ({status:false, message : "review is required"})
     if(validators.isvalidEmpty(review))  return res.status(400).send ({status:false,message:"review is emptystring"})
     if(!validators.isvalidReview(review)) return res.status(400).send ({status:false,mesage:"invalid review"})
     
    let book = await bookModel.findOneAndUpdate({_id:bId,isDeleted:false},{$inc:{review:1}},{new:true}).lean().select({__v:0})
    if(!book) return res.status(404).send({status:false,message:"no books found"})
     
     const savedData = await reviewModel.create(data)
     let reviewsData = await reviewModel.find({bookId:bId,isDeleted:false}).select({createdAt:0,updatedAt:0,isDeleted:0,__v:0})
     
     book.reviewsData=reviewsData    //book variable m ek reviewData key bna rhe h jisme jo 43 m object mil rha usko store kr rhe h 
 
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

    for(i of arr){
        if(i=="rating"){
           
            if(typeof (data[i])!="number"||data[i]<1||data[i]>5) return res.status(400).send({status:false,message:`invalid ${i} format`}) 
        }
        if(i=="review"){
        if(validators.isvalidEmpty(data[i]))  return res.status(400).send ({status:false,message:"review is emptystring"})
        if(!validators.isvalidReview(data[i])) return res.status(400).send({status:false,message:`invalid ${i} format`})
        }
        if(i=="reviewedBy"){
        if(validators.isvalidEmpty(data[i]))  return res.status(400).send ({status:false,message:"reviewedBy is emptystring"})
        if(!validators.isvalidName(data[i])) return res.status(400).send({status:false,message:`invalid ${i} format`})
        }
    }

    let book = await bookModel.findOne({_id:bId,isDeleted:false}).lean()
    if(!book) return res.status(404).send({status:false,message:"no books found"})

    let review =  await reviewModel.findOneAndUpdate({_id:rId,bookId:bId,isDeleted:false},data,{new:true})
    if(!review) return res.status(404).send({status:false,message:"no review found"})

    
    book.reviewsData=review

    res.status(200).send({status:true,message:"Book List",data:book})
}catch(error){
    res.status(500).send({status:false,message:error.message})
}



}

const deleteReview = async function(req, res){
    try{

        bookId = req.params.bookId
        reviewId = req.params.reviewId

        if(!bookId) return res.status(400).send({ status: false, message: "book id is not given" })
        if(!reviewId) return res.status(400).send({ status: false, message: "review id is not given" })

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "book id is not valid" })
        }
        if (!isValidObjectId(reviewId)) {
            return res.status(400).send({ status: false, message: "review id is not in valid " })
        }
        const checkbookIdExist = await bookModel.findById({ _id: bookId })
        if (!checkbookIdExist) {
            return res.status(404).send({ status: false, message: "book you are searching does not exist" })
        }
        if (checkbookIdExist.isDeleted == true) {
            return res.status(404).send({ status: false, message: "book is already deleted" })
        }
        const checkReviewIdExist = await reviewModel.findById({ _id: reviewId })
        if (!checkReviewIdExist) {
            return rse.status(400).send({ status: false, message: "review does not exist" })
        }
        if (checkReviewIdExist.isDeleted == true) {
            return res.status(400).send({ status: false, message: "review is already deleted" })
        }



       const deletedReview = await reviewModel.findOneAndUpdate(
           {_id : reviewId,bookId:bookId},
           {$set : {isDeleted:true}},
           {new:true}


       )

       if(!deletedReview){
           return res.status(400).send({status :false, messaage : "review id is not associated with book id" })
       }

       const decreaseReviewValue = await bookModel.findOneAndUpdate(
           {_id : bookId},
           {$inc : {review : -1}},
           {new : true}
       )

       return res.status(200).send({status : true, message : "review deleted" })

     }catch(err){
        return res.status(500).send({status :false, message : err.message})
    }
}

module.exports={updateReview,deleteReview,createReview}