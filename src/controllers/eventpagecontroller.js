const eventpageModel = require("../Models/eventpageModel")
const { isValidObjectId } = require("mongoose")

//-------------Function to Create eventpage---------------------------------------//

const createeventpage = async function (req, res) {

    try {

        let data = req.body;
        let newdata = await productmodel.create(data);

        return res.status(201).send({ msg: newdata })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//-------------------Function to get particular eventpage by its Id-----------------------//

const geteventById = async function (req, res) {
    try {
        const eventId = req.params.eventId;
        const eventpage = await eventpageModel.findOne({ _id: productId, isDeleted: false, })
        if (!eventpage) return res.status(404).send({ msg: "No eventpage found" })
        return res.status(200).send({ status: true, message: "Success", data: eventpage });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

//------------------------- Function to get all eventpage----------------------//
const geteventpage = async function (req, res) {

    try {

        let data = req.query
        data.isdeleted = false
        let eventpage = await eventpageModel.find(data)
        if (eventpage) {
            return res.status(200).send({ msg: eventpage })
        } else return res.status(404).send("Data of eventpage not found")
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//--------------------------Function to delete particular eventpage---------------------//

const deleteeventpage = async function (req, res) {
    try {
        const eventpageId = req.params.eventpageId

        if (!eventpageId) return res.status(400).send({ status: false, message: "eventpageId is required." })

        const deletedeventpage = await eventpageModel.findOneAndUpdate(
            { _id: eventpageId, isDeleted: false },
            { isDeleted: true },
            { new: true })

        if (!deletedeventpage) return res.status(404).send({ status: false, message: "eventpage you are trying to fetch is unavailable OR already deleted" })

        return res.status(200).send({ status: true, message: " eventpage is deleted " })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//--------------------------Function to update particular eventpage-----------------------//
const Updateeventpage = async function (req, res) {

    try {
        let data = req.body;
        let eventpageId = req.params.eventpageId;

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: 'Enter eventpage Details' })
        if (!eventpageId)
            return res.status(400).send({ status: false, msg: 'eventpageId is missing' })

        let findeventpageId = await productmodel.findById(eventpageId);

        if (findeventpageId.isdeleted == true) {
            return res.status(400).send({ status: false, msg: "eventpage is deleted" })

        }

        const Updateddata = await eventpageModel.findOneAndUpdate({ _id: eventpageId, isDeleted: false }, data, { new: true })
        if (!Updateddata) { return res.status(404).send({ status: false, msg: "No eventpage found" }) }
        return res.status(200).send({ status: true, data: Updateddata })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createeventpage, geteventById, geteventpage, deleteeventpage, Updateeventpage };
