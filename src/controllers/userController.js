const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const aws =  require("aws-sdk")
const Validator = require("../validation/validator");

aws.config.update({
  accessKeyId : "AKIAY3L35MCRZNIRGT6N",
  secretAccessKey : "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",
  region: "ap-south-1"
})

  let uploadFile = async ( file) =>{
  return new Promise(function(resolve, reject) {
    let s3= new aws.S3({apiVersion: '2006-03-01'});
 
    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket", 
        Key: "abc/" + file.originalname, 
        Body: file.buffer
    }
    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })
  })
}

const  profileImage = async function(req, res){
  try{
      let files= req.files
      if(files && files.length>0){
          let uploadedFileURL= await uploadFile( files[0] )
          res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
      }
      else{
          res.status(400).send({ msg: "No file found" })
      }
      
  }
  catch(err){
      res.status(500).send({msg: err})
  }
}

const createUser = async function (req, res) {
    try {
      let data = req.body;

      let bearerToken = req.headers.authorization
      console.log(bearerToken)
      let temp =  bearerToken.split(" ")
      let token = temp[1]

      const { fname, lname,email,uploadFile, phone, password, address } = data;

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

  if (!Validator.isValidInputValue(password) || !Validator.isValidPassword(password)
  ) {
    return res.status(400).send({ status: false, message:"Password is required and should be of 8 to 15 characters and  must have atleast 1 number",});
  }

  if(address){
    const {shipping,billing} = address

    if(shipping){
      const {street,city,pincode } = shipping

    }

    if(billing){
      const {street,city,pincode } = billing
    }
  }

  // if (!Validator.isValidImageType(uploadFile)) {
  //   return res.status(400).send({status: false,message: "Only images can be uploaded (jpeg/jpg/png)"});
  // }

  const saltRounds = 10;
  let encryptedPassword = bcrypt.hash(password, saltRounds)
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

const getUser = async function(req,res){
  try {
      const userId = req.params.userId
      const user = await userModel.find({_id :userId})
      return res.status(200).send({status :  true ,message: "User profile details",data:user})
      
  } catch (error) {
      return res.status(500).send({status : false , message : error.message})     
  }
}

module.exports = {profileImage,createUser,getUser}