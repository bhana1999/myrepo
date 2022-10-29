const NewPublisherModel= require("../models/newPublisherModel")//importing

const newcreatePublisher= async function (req, res) { // writting logic
    let newPublisher = req.body// accesing data inside body
    let newpublisherCreated = await NewPublisherModel.create(newPublisher)// creating data
    //and saving it in database and saving it in variable 
    res.send({data: newpublisherCreated})//send  data as respose
}

module.exports.newcreatePublisher=newcreatePublisher//exporting function here