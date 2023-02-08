const express = require("express")// Requiring express framework.
const router = express.Router()
const productcontroller = require("../controllers/productcontroller")
const categorycontroller = require("../controllers/categorycontroller")


//-------------------- API for Create Categories--------------------------------------------//
router.post("/createcategories", categorycontroller.createcategory)

//--------------------API for Create Products----------------------------------------------//
router.post("/createproducts", productcontroller.createproduct)

//-------------------API for get/read particular product---------------------------------------//
router.get("/product/:productId", productcontroller.getproductById)

//------------------API for get/read All products---------------------------------------------//
router.get("/products", productcontroller.getProduct);

//------------------API for deleting particular product-------------------------------------//
router.delete("/product/:productId", productcontroller.deleteProduct)

//-----------------API for Updating particular product-----------------------------------//
router.put("/updatedproduct/:ProductId", productcontroller.UpdateProduct)


module.exports = router