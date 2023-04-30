const usermodel = require("../Models/usermodel") // require model
const jwt  = require("jsonwebtoken") // require jsonwebtoken
const Validations = require("../Validation/Validation")// require validation file

//---------------------------------creating user-----------------------------------------
const createuser = async function (req, res) {

    try {

        let data = req.body;
        if (Object.keys(data) == 0) {
            return res
              .status(400)
              .send({ status: false, message: "No input provided" });
          }
          const { username, email, password,mobile } = data
          if (!username) {
            return res.status(400).send({ status: false, message: "please enter the username" })
          }
          if (!Validations.isValidName(username)) {
            return res.status(400).send({ status: false, message: "Invalid username" })
          }
          if (!email) {
            return res.status(400).send({ status: false, message: "please enter the username" })
          }
          if (!Validations.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid email" })
          }
          if (!password) {
            return res.status(400).send({ status: false, message: "please enter the password" })
          }
          if (!mobile) {
            return res.status(400).send({ status: false, message: "please enter the mobile" })
          }
          if (!Validations.isValidMobileNumber(mobile)) {
            return res.status(400).send({ status: false, message: "Invalid email" })
          }

       
        let newdata = await usermodel.create(data);

        res.status(201).send({ status: true, data: newdata })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

//-------------------------login user-----------------------------------------------------

const loginuser = async function (req,res){

    try {
    
        let email = req.body.email
        let password = req.body.password
    
        if (Object.keys(req.body).length == 0){
            return res.status(400).send({status:false , msg: "email and password is required"})
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "please enter the username" })
          }
          if (!Validations.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid email" })
          }
          if (!password) {
            return res.status(400).send({ status: false, message: "please enter the password" })
          }
    
        let userdata = await authormodel.findOne({email:email},{password:password})
    
        if (!userdata) return res.status(404).send({status:false,msg:"user not found"})
    
        let token = jwt.sign({authorid:authordata._id.toString(),team : "secretkey"},"secretkey");
    
        res.setHeader("x-api-key",token)
    
        res.status(200).send({statu : true, token : token })
    
    } catch (error) {
    
        res.status(500).send(error.message)
    }
    
    }

module.exports = { createuser, loginuser }; // exporting functions