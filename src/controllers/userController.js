const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Validator = require("../validation/validator");


const createUser = async function (req, res) {
    try {
      let data = req.body;
  
      const { fname, lname, email, phone, password, address } = data;

 if (!Validator.isValidBody(data)) {
    return res.status(400).send({status: false,message: "User data is required for registration", });
  }
  if (!Validator.isValidInputValue(fname) || !Validator.isValidOnlyCharacters(fname) ) {
    return res.status(400).send({status: false,message: "First name is required and it should contain only alphabets", });
  }
  if (
    !Validator.isValidInputValue(lname) || !Validator.isValidOnlyCharacters(lname) ) {
    return res.status(400).send({status: false,message: "Last name is required and it should contain only alphabets"});
  }

  if (!Validator.isValidInputValue(email) || !Validator.isValidEmail(email)) {
    return res.status(400).send({status: false,message: "email address is required and should be a valid email address" });
  }

  const notUniqueEmail = await userModel.findOne({ email:email});
  if (notUniqueEmail) {
    return res.status(400).send({ status: false, message: "Email address already exist" });
  }

  if (!Validator.isValidInputValue(phone) || !Validator.isValidPhone(phone)) {
    return res.status(400).send({status: false, message: "Phone number is required and should be a valid mobile number"});
  }

  const notUniquePhone = await userModel.findOne({ phone:phone });
  if (notUniquePhone) {
    return res.status(400).send({ status: false, message: "phone number already exist" });
  }

  if (
    !Validator.isValidInputValue(password) || !Validator.isValidPassword(password)
  ) {
    return res.status(400).send({ status: false, message:"Password is required and should be of 8 to 15 characters and  must have atleast 1 number",});
  }

  if (!Validator.isValidAddress(address)) {
    return res.status(400).send({ status: false, message: "Address is required!" });
  }

  if (!files || files.length == 0) {
    return res.status(400).send({ status: false, message: "No profile image found" });
  }

  if (!Validator.isValidImageType(files[0].mimetype)) {
    return res.status(400).send({status: false,message: "Only images can be uploaded (jpeg/jpg/png)"});
  }

  let fileUrl = await uploadFile(files[0].mimetype);
  data.profileImage = fileUrl;

  const saltRounds = 10;
  let encryptedPassword = bcrypt.hash(data.password, saltRounds)
    .then((hash) => { console.log(`Hash: ${hash}`);
    return hash;
    });

  data.password = await encryptedPassword;

      let savedData = await userModel.create(data);
      return res.status(201).send({status: true,message: "User created successfully",data: savedData,});
    }catch(err){
        return res.status(500).send({status:false, err: err.message })
    }
}


module.exports = {createUser}