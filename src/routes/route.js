const express = require('express');
const router = express.Router();

//const authorController= require("../controllers/authorController")
const newauthorController= require("../controllers/newauthorController")//importing
//newauthorController file and store it in variable newauthorController
const newpublisherController=require("../controllers/newpublisherController")//importing
const newbookController=require("../controllers/newbookController")//importing

const bookController= require("../controllers/bookController")

router.post("/newcreateAuthor", newauthorController.newcreateAuthor)//creating post api,
//accesing newcreateAuthor function inside newauthorController

router.post("/newcreatePublisher", newpublisherController.newcreatePublisher)//creating 
router.post("/newcreateBook", newbookController.newcreateBook)//creating 
router.get("/getBookwithPublisherandAuthor",newbookController.getBookwithPublisherandAuthor)
// above we are fetching data with the help of get api .
module.exports = router;






//write above

//router.get("/test-me", function (req, res) {
    //res.send("My first ever api!")
//})
//router.post("/createAuthor", authorController.createAuthor  )

//router.get("/getAuthorsData", authorController.getAuthorsData)

//router.post("/createBook", bookController.createBook  )

//router.get("/getBooksData", bookController.getBooksData)

//router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)