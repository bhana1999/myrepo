const NewBookModel= require("../models/newBookModel")//importing newBookModel file
const newauthorModel = require("../models/newauthorModel")//importing newauthorModel file
const NewPublisherModel= require("../models/newPublisherModel")//importing newPublisherModel file
const newBookModel = require("../models/newBookModel")//importing newBookModel file


const newcreateBook= async function (req, res) {//wrriting logic inside my function
    let newBook = req.body // accesing data inside body with the help of req.body
    let newbookCreated = await NewBookModel.create(newBook)//entry will be created and
                                                           //saved inside newbookCreated
    res.send({data: newbookCreated})// send our data as response 
}
const getBookwithPublisherandAuthor = async function (req, res) {
    let Book1 = await NewBookModel.find().populate('newauthor_id').populate('newPublisher_id')
    res.send({data: Book1})
}
//in above function we write our logic use populate so that it matches objectid with newauthorid
//and replace it with the document present inside newauthorschema
module.exports.getBookwithPublisherandAuthor=getBookwithPublisherandAuthor
module.exports.newcreateBook=newcreateBook
//in above lines we are exporting our functions