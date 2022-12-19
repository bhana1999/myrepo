const express =require("express")
const router = express.Router()
const link = require('../aws/aws')

const userContoller = require("../controllers/userController")



//===============aws=======================
router.post('/write-file-aws',link.getImage)

//============createuser=====================
router.post('/register',userContoller.createUser)

/******************************get user *****************************/
router.get("/user/:userId/profile",userContoller.getUser)

module.exports = router;