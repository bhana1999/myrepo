const express =require("express")
const router = express.Router()
const link = require('../aws/aws')

const userContoller = require("../controllers/userController")

//=============== aws =======================
router.post('/write-file-aws',link.getImage)

//============ createuser =====================
router.post('/register',userContoller.createUser)

//========== login user =========================
router.post("/login",userContoller.loginUser)

//=========== get user ==========================
router.get("/user/:userId/profile",userContoller.getUser)

//==================update user ================
router.put("/user/:userId/profile",userContoller.UpdateUser)


module.exports = router;