const express = require('express');
const router = express.Router()

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



module.exports=router