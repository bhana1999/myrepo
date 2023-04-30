const express = require("express")// Requiring express framework.
const router = express.Router()
const usercontroller = require("../Controllers/user.js")
const{authentication}=require("../Middleware/Middleware")


//--------------------API for Create user----------------------------------------------//
router.post("/createuser",usercontroller.createuser)

//-------------------API for login users---------------------------------------//
router.get("/loginuser",authentication, usercontroller.loginuser)


module.exports = router
