const express = require("express")// Requiring express framework.
const router = express.Router()
const usercontroller = require("../Controllers/user.js")


//--------------------API for Create user----------------------------------------------//
router.post("/createuser",usercontroller.createuser)

//-------------------API for get/read users---------------------------------------//
router.get("/getuser", usercontroller.getuser)


module.exports = router
