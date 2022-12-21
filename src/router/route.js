const express =require("express")
const router = express.Router()
const link = require('../aws/aws')
const {authenticate,authorisation} = require('../middileware/auth')
const userContoller = require("../controllers/userController")
const productConteroller = require("../controllers/productConteroller")

//=============== aws =======================
router.post('/write-file-aws',link.getImage)

//============ createuser =====================
router.post('/register',userContoller.createUser)

//========== login user =========================
router.post("/login",userContoller.loginUser)

//=========== get user ==========================
router.get("/user/:userId/profile",authenticate,userContoller.getUser)

//==================update user ================
router.put("/user/:userId/profile",authenticate,authorisation,userContoller.UpdateUser)

//================== create product =================
router.post("/products",productConteroller.createProduct)

//==================get products ===================
router.get("/products",productConteroller.getProduct)

//==================get product by id ==============
router.get("/products/:productId",productConteroller.getproductById)

//================= update product ===================
router.put("/products/:productId",productConteroller.updateProduct)

//==================delete product ================
router.delete("/products/:productId",productConteroller.deleteProduct)

module.exports = router;