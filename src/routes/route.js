const express = require("express")// Requiring express framework.
const router = express.Router()
const eventpagecontroller = require("../controllers/eventpagecontroller")


//--------------------API for Create eventpage----------------------------------------------//
router.post("/createeventpage", eventpagecontroller.createeventpage)

//-------------------API for get/read particular eventpage---------------------------------------//
router.get("/eventpage/:eventpageId", eventpagecontroller.geteventById)

//------------------API for get/read All eventpage---------------------------------------------//
router.get("/events", eventpagecontroller.geteventpage);

//------------------API for deleting particular eventpage-------------------------------------//
router.delete("/event/:eventpageId",  eventpagecontroller.deleteeventpage)

//-----------------API for Updating particular eventpage-----------------------------------//
router.put("/updatedeventpage/:eventpageId", eventpagecontroller.Updateeventpage)


module.exports = router