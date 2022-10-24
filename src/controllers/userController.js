const UserModel= require("../models/userModel")

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

const createbook = async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getbooklist= async function (req, res) {
    let allUsers= await UserModel.bookName
    res.send({msg: allUsers})
}


module.exports.createbook=createbook
module.exports.getbooklist=getbooklist
//module.exports.createUser= createUser
//module.exports.getUsersData= getUsersData