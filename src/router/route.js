const express =require("express")
const router = express.Router()
const userContoller = require("../controllers/userController")





router.post('/register',userContoller.createUser)




module.exports = router;