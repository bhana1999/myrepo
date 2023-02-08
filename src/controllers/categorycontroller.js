const categorymodel = require("../Models/categorymodel")

//--------------------Function for Creating Category---------------------------------//

const createcategory = async function (req, res) {

    try {

        let data = req.body;
        let { categoryName } = data
        if (!categoryName) { return res.status(400).send({ status: false, msg: "categoryName is required" }) }
        let duplicatecategoryName = await categorymodel.findOne({ categoryName })

        if (duplicatecategoryName) return res.status(400).send({ status: false, message: "categoryName is already exist" })
        let newdata = await categorymodel.create(data);
        return res.status(201).send({ msg: newdata })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports = { createcategory } // Exporting Function so that we can use it in another Module..//