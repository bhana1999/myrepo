const NFTsModel = require("../Models/NFTsModel") // importing model
const { isValidObjectId } = require("mongoose") // importing mongoose

//-------------Function to Create NFTs---------------------------------------//

const createNFTs = async function (req, res) {

    try {

        let data = req.body;
        let newdata = await NFTsModel.create(data);

        return res.status(201).send({ msg: newdata })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//-------------------Function to get particular NFTs by its Id-----------------------//

const getNFTsById = async function (req, res) {
    try {
        const NFTsId = req.params.NFTsId;
        const NFTS = await NFTsModel.findOne({ _id: NFTsId, isDeleted: false, })
        if (!NFTS) return res.status(404).send({ msg: "No NFT found" })
        return res.status(200).send({ status: true, message: "Success", data: NFTS });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

//------------------------- Function to get all NFTs----------------------//
const getNFTs = async function (req, res) {

    try {

        let data = req.query
        data.isdeleted = false
        let NFTs = await NFTsModel.find(data)
        if (NFTs) {
            return res.status(200).send({ msg: NFTs })
        } else return res.status(404).send("Data of NFT not found")
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//--------------------------Function to delete particular NFTs---------------------//

const deleteNFTs = async function (req, res) {
    try {
        const NFTsId= req.params.NFTsId

        if (!NFTsId) return res.status(400).send({ status: false, message: "NFTsId is required." })

        const deleteNFTs = await NFTsModel.findOneAndUpdate(
            { _id: NFTsId, isDeleted: false },
            { isDeleted: true },
            { new: true })

        if (!deleteNFTs) return res.status(404).send({ status: false, message: "NFT you are trying to fetch is unavailable OR already deleted" })

        return res.status(200).send({ status: true, message: " NFT is deleted " })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//--------------------------Function to update particular NFTs-----------------------//
const UpdateNFTs = async function (req, res) {

    try {
        let data = req.body;
        let NFTsId = req.params.NFTsId;

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: 'Enter NFT Details' })
        if (!NFTsId)
            return res.status(400).send({ status: false, msg: 'NFTsId is missing' })

        let findNFTsId = await NFTsModel .findById(NFTsId);

        if (findNFTsId.isdeleted == true) {
            return res.status(400).send({ status: false, msg: "NFT is deleted" })

        }

        const Updateddata = await NFTsModel.findOneAndUpdate({ _id: NFTsId, isDeleted: false }, data, { new: true })
        if (!Updateddata) { return res.status(404).send({ status: false, msg: "No NFT found" }) }
        return res.status(200).send({ status: true, data: Updateddata })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createNFTs, getNFTsById, getNFTs, deleteNFTs,UpdateNFTs };
