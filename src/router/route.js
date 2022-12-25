const express =require('express')
const router=express.Router();
const customerController = require("../controllers/customerController.js")
const cardController = require("../controllers/cardController.js")

router.post("/createcustomer",customerController.createcustomer)

router.get("/getCustomer",customerController.getcustomer)

router.delete("/deleteCustomer",customerController.deletecustomer)

router.post("/createCard",cardController.createcard)

router.get("/getCard",cardController.getcard)

module.exports=router;