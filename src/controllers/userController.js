const userModel = require("../models/userModel")
const validators = require("../validator/validator")
const jwt = require("jsonwebtoken")

//---------------------------------------createUser------------------------------------------//

const createuser = async function (req, res) {
  try {
    const data = req.body
    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "No input provided" });
    }
    const { title, name, phone, email, password, } = req.body
    if (!title) { res.status(400).send({ status: false, message: "title is missing" }) }
    if (!name) { res.status(400).send({ status: false, message: "name is missing" }) }
    if (!phone) { res.status(400).send({ status: false, message: "phone is missing" }) }
    if (!validators.isvalidMobileNumber(phone)) {
      return res.status(400).send({ status: false, message: "Invalid phone number" })
    }
    const find1 = await userModel.findOne({ phone: phone })
    if (find1) { res.status(400).send({ status: false, message: "phone number already exists" }) }

    if (!email) { res.status(400).send({ status: false, message: "email is missing" }) }
    if (!validators.isvalidEmail(email)) {
      return res.status(400).send({ status: false, message: "Invalid email" })
    }
    const find2 = await userModel.findOne({ email: email })
    if (find2) { res.status(400).send({ status: false, message: "email already exists" }) }

    if (!password) { res.status(400).send({ status: false, message: "password is missing" }) }
    if (!validators.isvalidpassword(password)) {
      return res.status(400).send({ status: false, message: "Invalid password" })
    }
    const createuser = await userModel.create(data);
    return res.status(201).send({ status: true, data: createuser })
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
//------------------------------------loginUser---------------------------------------------//

const loginuser = async function (req, res) {

  try {

    let email = req.body.email
    let password = req.body.password
    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "No input provided" });
    }
    if (!email) { res.status(400).send({ status: false, message: "email is missing" }) }
    if (!validators.isvalidEmail(email)) {
      return res.status(400).send({ status: false, message: "Invalid email" })
    }
    if (!password) { res.status(400).send({ status: false, message: "password is missing" }) }
    if (!validators.isvalidpassword(password)) {
      return res.status(400).send({ status: false, message: "Invalid password" })
    }
    let userdata = await userModel.findOne({ email: email }, { password: password })
    let token = jwt.sign({ userid: userdata._id.toString() }, "lithiumproject3", { expiresIn: "1h" });

    res.setHeader("x-api-key", token)

    res.status(200).send({ status: true, token: token })

  } catch (error) {

    res.status(500).send(error.message)
  }

}

module.exports = { loginuser, createuser }
