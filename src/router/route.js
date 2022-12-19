const express =require("express")
const router = express.Router()
const userContoller = require("../controllers/userController")

/*******************************create image url **********************/
router.post("/profileImage" ,userContoller.profileImage)

/*******************************create user  *************************/
router.post('/register',userContoller.createUser)

/******************************get user *****************************/
router.get("/user/:userId/profile",userContoller.getUser)

module.exports = router;