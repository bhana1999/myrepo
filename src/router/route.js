const express =require("express")
const router = express.Router()
const link = require('../aws/aws')
const {authenticate,authorisation} = require('../middleware/auth')
const userContoller = require("../controllers/userController")
const productConteroller = require("../controllers/productConteroller")
const cartController = require ("../controllers/cartController")
const orderController = require("../controllers/orderController")


//=============== aws =======================
router.post("/write-file-aws", link.getImage);

//============ createuser =====================
router.post("/register", userContoller.createUser);

//========== login user =========================
router.post("/login", userContoller.loginUser);

//=========== get user ==========================
router.get("/user/:userId/profile", authenticate, userContoller.getUser);

//==================update user ================
router.put("/user/:userId/profile",authenticate,authorisation,userContoller.UpdateUser);

//================== create product =================
router.post("/products", productConteroller.createProduct);

//==================get products ===================
router.get("/products", productConteroller.getProduct);

//==================get product by id ==============================
router.get("/products/:productId",productConteroller.getproductById)

//================= update product ================================
router.put("/products/:productId",productConteroller.updateProduct)

//==================delete product =================================
router.delete("/products/:productId",productConteroller.deleteProduct)

//==================create cart =======================================
router.post("/users/:userId/cart",authenticate,authorisation,cartController.createCart)

//===================update cart =======================================
router.put("/users/:userId/cart",authenticate,authorisation,cartController.updateCart)

//=============== get cart ===============================================
router.get("/users/:userId/cart",authenticate,authorisation,cartController.getCart)

//==================delete api ==============================================
router.delete("/users/:userId/cart",authenticate,authorisation,cartController.deleteCart)

//================= create order api =================================================
router.post("/users/:userId/orders",authenticate,authorisation,orderController.createOrder)
//================= update order api =================================================
router.put("/users/:userId/orders",authenticate,authorisation,orderController.updateOrder)

module.exports = router;
