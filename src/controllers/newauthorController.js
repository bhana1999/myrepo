const NewAuthorModel= require("../models/newauthorModel")//importing newauthorModel file

const newcreateAuthor= async function (req, res) { // creating our logic inside function
    let newauthor = req.body
    let newauthorCreated = await NewAuthorModel.create(newauthor)
    res.send({data: newauthorCreated})
}

module.exports.newcreateAuthor=newcreateAuthor// giving public name to our function.
// or above exporting our function.