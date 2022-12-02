const BookModel = require("../models/bookModel")
const moment = require('moment')
const validators = require('../validator/validator')
const { isValidObjectId } = require("mongoose")
const reviewModel = require("../models/reviewModel")
const userModel = require("../models/userModel")


//------------------------------createBook------------------------------------------------//

const createBooks = async function (req, res) {
    try {
        let data = req.body

        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data
        if (!title) { return res.status(400).send({ status: false, message: "title is required" }) }
        if (validators.isvalidEmpty(title)) return res.status(400).send({ status: false, message: "title is emptystring" })
        if (!validators.isValidBooktitle(title)) { return res.status(400).send({ status: false, message: "invalid title" }) }

        if (!excerpt) return res.status(400).send({ status: false, message: "excerptis required" })
        if (validators.isvalidEmpty(excerpt)) return res.status(400).send({ status: false, message: "excerpt is emptystring" })
        if (!validators.isvalidReview(excerpt)) return res.status(400).send({ status: false, message: "excerpt is in inavlid format" })

        if (!userId) return res.status(400).send({ status: false, message: "userId is required" })
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "userId is invalid" })
        if (userId != req.token.userid) return res.status(403).send({ status: false, message: "unauthorised" })

        if (!ISBN) return res.status(400).send({ status: false, message: "ISBN is required" })
        if (validators.isvalidEmpty(ISBN)) return res.status(400).send({ status: false, message: "ISBN is emptystring" })
        if (!validators.isvalidISBN(ISBN)) return res.status(400).send({ status: false, message: "ISBN is in inavlid format" })


        if (!category) return res.status(400).send({ status: false, message: "category is required" })
        if (validators.isvalidEmpty(category)) return res.status(400).send({ status: false, message: "category is emptystring" })
        if (!validators.isvalidName(category)) return res.status(400).send({ status: false, message: "invalid category" })

        if (!subcategory) return res.status(400).send({ status: false, message: "subcategory is required" })
        if (validators.isvalidEmpty(subcategory)) return res.status(400).send({ status: false, message: "category is emptystring" })
        if (!validators.isvalidName(subcategory)) return res.status(400).send({ status: false, message: "invalid subcategory" })

        if (!releasedAt) return res.status(400).send({ status: false, message: "releasedAt is required" })
        if (validators.isvalidEmpty(releasedAt)) return res.status(400).send({ status: false, message: "category is emptystring" })
        if (!validators.isvalidDate(releasedAt)) return res.status(400).send({ status: false, message: "invalid releasedAT" })


        const Pb = await BookModel.findOne({ $or: [{ title: title }, { ISBN: ISBN }] })
        if (Pb) { return res.status(400).send({ status: false, message: "Book already exists" }) }

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

    let arr = Object.keys(data)

    for (i of arr) {

        if (i == "userId") {
            if (!isValidObjectId(data[i])) { return res.status(400).send({ status: false, message: "invalid releasedAt" }) }
        }

        if (i == "category" || i == "subcategory") {

            if (validators.isvalidEmpty(data[i])) return res.status(400).send({ status: false, message: `${i} is emptystring` })
            if (!validators.isvalidName(data[i])) return res.status(400).send({ status: false, message: `invalid ${i}` })
        }
    }

    data.isDeleted = false


    let bOoks = await BookModel.find(data).sort({ title: 1 }).select({ ISBN: 0, subcategory: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    if (bOoks.length == 0) { return res.status(404).send({ status: false, message: "no books found" }) }

    return res.status(200).send({ status: true, message: "Book List", data: bOoks })

}

const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        if (!bookId) {
            return res.status(400).send({ msg: "please input book ID" })
        }
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "bookId is not valid" })
        }
        let bookData = await BookModel.findById({ _id: bookId, isDeleted: false }).lean()
        if (!bookData) {
            return res.status(404).send({ msg: "no book found/already deleted" })
        }
        let reviewsData = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ createdAt: 0, updatedAt: 0, isDeleted: 0, __v: 0 })

        bookData.reviewsData = reviewsData

        res.status(200).send({ status: true, message: "Book List", data: bookData })



    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const UpdateBooks = async function (req, res) {

    try {
        let id = req.params.bookId 
        if (!id) { return res.status(400).send({ status: false, message: "please provide BookId" }) }

        let isValidBookId = isValidObjectId(id)
        if (!isValidBookId) return res.status(400).send({ status: false, msg: "BookId is not a valid ObjectId." })

        var data = req.body

        let arr = Object.keys(data)
        if (arr.length == 0) { return res.status(400).send({ status: false, message: "empty body" }) }
        for (i of arr) {

            if (i == "releasedAt") {
                if (!validators.isvalidDate(data[i])) { return res.status(400).send({ status: false, message: "invalid releasedAt" }) }
            }
            if (i == "ISBN") {
                if (!validators.isvalidISBN(data[i])) { return res.status(400).send({ status: false, message: "invalid ISBN" }) }
            }

            if (i == "title" || i == "excerpt") {

                if (!validators.isValidBooktitle(data[i])) { return res.status(400).send({ status: false, message: `invalid ${i}` }) }
                if (validators.isvalidEmpty(data[i])) { return res.status(400).send({ status: false, message: `invalid ${i}` }) }
            }
            if (data[i] == "") { return res.status(400).send({ status: false, message: `empty string at ${i}` }) }
        }
        if (!data) { return res.status(400).send({ status: false, msg: "empty body" }) }
        
        const { title, ISBN } = data
        const Pb = await BookModel.findOne({ $or: [{ title:title }, {  ISBN:ISBN }] })
        if (Pb) { return res.status(400).send({ status: false, message: "Book already exists" }) }
        console.log(Pb)

        const tosend = await BookModel.findOneAndUpdate({ _id: id, isDeleted: false }, data, { new: true })
        if (!tosend) { return res.status(404).send({ status: false, msg: "No books found" }) }
        return res.status(200).send({ status: true, data: tosend })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

const deleteBooks = async function (req, res) {

    try {

        let bookId = req.params.bookId

        if (!bookId) return res.status(400).send({ status: false, message: "BookId is required." })

        let isValidBookId = isValidObjectId(bookId)

        if (!isValidBookId) return res.status(400).send({ status: false, message: "BookId is not a valid ObjectId." })

        let deletedBook = await BookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!deletedBook) return res.status(404).send({ status: false, message: "book you are trying to access is unavailable OR already deleted" })

        res.status(200).send({ status: true, message: " book is deleted " })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createBooks, getBooks, deleteBooks, UpdateBooks, getBookById }


