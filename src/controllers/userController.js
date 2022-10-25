const UserModel= require("../models/userModel")// Importing userModel here acess with the help of variable UserModel

/**const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}
*/

const createbook = async function (req, res) { // creating function
    let data= req.body // accesing data inside body and store it in variable data
    let savedData= await UserModel.create(data) // creating data inside database and saved it in variable
    res.send({msg: savedData}) // send respose
}

const getbooklist= async function (req, res) { // creating function
    let allBook= await UserModel.find({bookName : "ABD"}) // find our data and save in variable 
    res.send({msg: allBook})// send response
}


module.exports.createbook=createbook//giving public name so that i can access them or exporting
module.exports.getbooklist=getbooklist
//module.exports.createUser= createUser
//module.exports.getUsersData= getUsersData