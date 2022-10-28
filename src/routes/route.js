const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
//const UserController= require("../controllers/userController")
const BookModel= require("../models/bookModel")
const BookController= require("../controllers/bookController")

//router.get("/test-me", function (req, res) {
    //res.send("My first ever api!")
//})

//router.post("/getBooksInYear",BookController.Bookinyear)

//router.get("/getBooklist", BookController.getBooklist)
//router.get("/getRandomBooks", BookController.getbook)
//router.get("/getRandomBooks" , BookController.ABC)
router.get("/indianprice" , BookController.indianprice)
module.exports = router;


/**router.post("/createUser", UserController.createUser  )
router.get("/getUsersData", UserController.getUsersData)
router.post("/createBook", BookController.createBook  )
router.get("/getBooksData", BookController.getBooksData)
**/
//router.post("/createBook", BookController.createBook  )
//route