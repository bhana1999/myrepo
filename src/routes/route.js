const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")// importing userModel.js file inside variable userModel
const UserController= require("../controllers/userController") // importing file inside varibale UserControler

//router.get("/test-me", function (req, res) {
    //res.send("My first ever api!")
//})

//router.post("/createUser", UserController.createUser  )

//router.get("/getUsersData", UserController.getUsersData)

router.post("/createbook",UserController.createbook)//creating post  Api and calling function name createbook inside UserController.
router.get("/getbooklist",UserController.getbooklist)// creating  get Api and calling function getbooklist inside UserController.

module.exports = router;