const BookModel = require("../models/bookModel")
const moment = require('moment')
// const bookModel = require('../Model/bookModel')
// const userModel = require("../Model/userModel")

//------------------------------createBook------------------------------------------------//

const createBooks = async function (req, res) {
    try {
        let data = req.body

        let { title, excerpt, userId, ISBN, category, subcategory } = data
        if (!title) { return res.status(400).send({ status: false, message: "title is required" }) }
        const Title = await bookModel.findOne({ title: title })
        if (Title) { res.status(400).send({ status: false, message: "This Title is already exists" }) }

        if (!excerpt) return res.status(400).send({ status: false, message: "excerptis required" })
        if (!userId) return res.status(400).send({ status: false, message: "userId is required" })
        if (!ISBN) return res.status(400).send({ status: false, message: "ISBN is required" })
        const isbnnumber = await bookModel.findOne({ ISBN: ISBN })
        if (isbnnumber) {res.status(400).send({ status: false, message: "This ISBN Number is already exists" }) }

        if (!category) return res.status(400).send({ status: false, message: "category is required" })
        if (!subcategory) return res.status(400).send({ status: false, message: "subcategory is required" })
        if (!validators.isvaliduserId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId" })


        }

        data.releasedAt = Date.now()

        let saveData = await BookModel.create(data)
        return res.status(201).send({ status: true, message: saveData })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//--------------------------------getBook---------------------------------------------------//


const getBooks = async function (req, res) {
    let data = req.query
    data.isDeleted = false


    let bOoks = await BookModel.find(data).sort({ title: 1 }).select({ ISBN: 0, subcategory: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    if (bOoks.length == 0) { return res.status(404).send({ status: false, message: "no books found" }) }

    return res.status(200).send({ status: true, data: bOoks })

}

module.exports = { createBooks, getBooks }