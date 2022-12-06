const express = require('express');
const router = express.Router()
const aws = require("aws-sdk")

const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const routController = require("../controllers/reviewController")
const{authentication,Authorization}=require("../middilware/middilware")





router.post("/register", userController.createuser)

router.post("/login", userController.loginuser)

router.post("/books",authentication,bookController.createBooks)

router.get("/books",authentication,bookController.getBooks)

router.get("/books/:bookId",authentication,bookController.getBookById)

router.put("/books/:bookId",authentication,Authorization,bookController.UpdateBooks)

router.delete("/books/:bookId",authentication,Authorization,bookController.deleteBooks)

router.post("/books/:bookId/review",routController.createReview)

router.put("/books/:bookId/review/:reviewId",routController.updateReview)

router.delete("/books/:bookId/review/:reviewId",routController.deleteReview)

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer 
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)  
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            var uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})

module.exports=router
