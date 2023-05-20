const express = require("express") // Requiring express framework.
const router = express.Router()
const NFTscontroller = require("../controllers/NFTscontroller") //importing controller
const{authentication}=require("../middilware/middilware") //importing middleware file


//--------------------API for Create NFTs----------------------------------------------//
router.post("/createNFTs", NFTscontroller.createNFTs)

//-------------------API for get  particular NFTs---------------------------------------//
router.get("/NFTS/:NFTSId",authentication, NFTscontroller.getNFTsById)

//------------------API for get/read All NFTs---------------------------------------------//
router.get("/NFTs",authentication, NFTscontroller.getNFTs);

//------------------API for deleting particular NFTs-------------------------------------//
router.delete("/NFTs/:NFTsId", authentication, NFTscontroller.deleteNFTs)

//-----------------API for Updating particular NFTs-----------------------------------//
router.put("/updatedNFTs/:NFTsId", authentication,NFTscontroller.UpdateNFTs)


module.exports = router