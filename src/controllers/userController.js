const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getImage } = require("../aws/aws");

const {isValidName,isValidEmail,isValidObjectId,isValidString,isValidPhone,
  isValidPassword,isValidPincode,} = require("../validation/validator");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let { fname, lname, email,phone, password, address } = data;
    let files = req.files;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data" });
    
    if (!files) return res.status(400).send({ status: false, message: "Please provide Profile Image" });
    data.profileImage = await getImage(files);

    if (!fname) return res.status(400).send({ status: false, message: "Please provide First Name" });
    if (!isValidName(fname) || !isValidString(fname)) return res.status(400).send({ status: false, message: "Please provide valid First Name" });

    if (!lname) return res.status(400).send({ status: false, message: "Please provide Last name" });
    if (!isValidName(lname) || !isValidString(lname)) return res.status(400).send({ status: false, message: "Please provide valid Last name" });

    if (!email) return res.status(400).send({ status: false, message: "Please provide Email" });
    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Please provide valid Email Id" });

    const findEmail =  await userModel.findOne({email : email})
    if(findEmail) return res.status(400).send({ status: false, message: "Please provide unique Email Id" });
    
    if (!phone) return res.status(400).send({ status: false, message: "Please provide Phone" });
    if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: "Please provide Phone" });
    
    const findPhone =  await userModel.findOne({phone : phone})
    if(findPhone) return res.status(400).send({ status: false, message: "Please provide unique Phone" });

    if (!password) return res.status(400).send({ status: false, message: "Please provide Password" });
    if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "Please provide Password" });
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
         data.password = secPass;
    if(!address){
    return res.status(400).send({status:false,message:"please provide address"})
    }else if(address){
      address = JSON.parse(address);
      data.address = address;

      const { shipping, billing } = address;
      if(!shipping){
        return res.status(400).send({status:false,message:"please provide shipping"})
      }else if (shipping) {
        const { street, city, pincode } = shipping;
        if (!street) return res.status(400).send({ status: false, message: "Please provide street" });
        if (!isValidString(street)) return res.status(400).send({ status: false, message: "Please provide Street" });
        
        if (!city) return res.status(400).send({ status: false, message: "Please provide city" });
        if (!isValidString(city) || !isValidName(city)) return res.status(400).send({ status: false, message: "Please provide city" });

        if (!pincode) return res.status(400).send({ status: false, message: "Please provide pincode" });
        if (!isValidPincode(pincode)) return res.status(400).send({ status: false, message: "Please provide Pincode" });
      
      }

      if(!billing){
        return res.status(400).send({status:false, message:"please provide billing"})
      }else
      if (billing) {
        const { street, city, pincode } = billing;
        if (!street) return res.status(400).send({ status: false, message: "Please provide street" });
        if (!isValidString(street))  return res.status(400).send({ status: false, message: "Please provide Street" });
        
        if (!city) return res.status(400).send({ status: false, message: "Please provide city" });
        if (!isValidString(city) || !isValidName(city)) return res.status(400).send({ status: false, message: "Please provide city" });

        if (!pincode) return res.status(400).send({ status: false, message: "Please provide pincode" });
        if (!isValidPincode(pincode)) return res.status(400).send({ status: false, message: "Please provide Pincode" });
      
      }
    }

    const user = await userModel.create(data);

    return res.status(201).send({status: true,message: "User Created Successfully",data: user,});
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//===================login api ==============================================
const loginUser = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;

    if (Object.keys(data).length == 0) return res.status(404).send({status: false,Msg: "Please provide data in the request body!",});

    if (!email) return res.status(400).send({ status: false, message: "Email is required!" });
    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Email is invalid!" });

    let checkEmail = await userModel.findOne({ email: email });
    if (!checkEmail) return res.status(404).send({ status: false, message: "Email does notexist" });
    
    if (!password) return res.status(400).send({ status: false, message: "Please enter password " });

    if (!isValidPassword(password)) return res.status(400).send({status: false,
      message:"Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!", });

    let encryptPwd = checkEmail.password;

    await bcrypt.compare(password, encryptPwd, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { _id: checkEmail._id.toString() },
          "lithiumproject5",
          {
            expiresIn: "72h",
          }
        );
        res.setHeader("x-api-key", token);

        return res.status(201).send({status: true,message: "User login successfull",data: { userId: checkEmail._id, token: token },});
      } else {
        return res.status(401).send({ status: false, message: "Incorrect password or email" });
      }
    });
  } catch (err) {
    res.status(500).send({ staus: false, message: err.message });
  }
};

//====================getapi=====================================================
const getUser = async function (req, res) {
  try {
    const userId = req.params.userId;
    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: " Invalid userId" });

    const userProfile = await userModel.findById(userId);
    if (!userProfile) return res.status(404).send({ status: false, message: "User Profile Not Found" });

    return res.status(200).send({status: true,message: "User profile details",data: userProfile,});
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//==================== put api ======================================
const UpdateUser = async(req,res)=>{
  try{
  let data = req.body
  let files = req.files
  let userId = req.params.userId

  let { fname, lname, email, phone, password, address, ...rest } = data

  if (fname) {
    if (!isValidName(fname) || !isValidString(fname)) return res.status(400).send({ status: false, message: "please enter valid fname" });
  }

  if (lname) {
    if (!isValidName(lname) || !isValidString(lname)) return res.status(400).send({ status: false, message: "please enter valid lname" });
  }

  if (email) {
    if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Please provide a valid email" });
    let uniqueEmail = await userModel.findOne({email :email});
    if(uniqueEmail) return res.status(400).send({ status: false, message: "Pls provide a Unique email" });
  }

  if (password) {
    if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "please provide valid password" });

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    data.password = secPass;
  }

  if (phone) {
    if (!isValidPhone(phone)) return res.status(400).send({ status: false, message: "Please provide a valid phone" });
    let uniquePhone = await userModel.findOne({phone :phone});
    if(uniquePhone) return res.status(400).send({ status: false, message: "Pls provide a Unique phone" });
  }

  if (address) {
    address = JSON.parse(address);
    data.address = address;

    const { shipping, billing } = address;
    if (shipping) {
      const { street, city, pincode } = shipping;
      if (!street) return res.status(400).send({ status: false, message: "Please provide street" });
      if (!isValidString(street)) return res.status(400).send({ status: false, message: "Please provide Street" });
      
      if (!city) return res.status(400).send({ status: false, message: "Please provide city" });
      if (!isValidString(city) || !isValidName(city)) return res.status(400).send({ status: false, message: "Please provide city" });

      if (!pincode) return res.status(400).send({ status: false, message: "Please provide pincode" });
      if (!isValidPincode(pincode)) return res.status(400).send({ status: false, message: "Please provide Pincode" });
    }
    if (billing) {
      const { street, city, pincode } = billing;
      if (!street) return res.status(400).send({ status: false, message: "Please provide street" });
      if (!isValidString(street)) return res.status(400).send({ status: false, message: "Please provide Street" });
      
      if (!city) return res.status(400).send({ status: false, message: "Please provide city" });
      if (!isValidString(city) || !isValidName(city)) return res.status(400).send({ status: false, message: "Please provide city" });

      if (!pincode) return res.status(400).send({ status: false, message: "Please provide pincode" });
      if (!isValidPincode(pincode)) return res.status(400).send({ status: false, message: "Please provide Pincode" });
    
    }
  }

  if (files && files.length > 0) {
      if (files.length > 1) return res.status(400).send({ status: false, message: "You can't enter more than one file for Update!" })
      let uploadedURL = await getImage(files)
      data.profileImage = uploadedURL
  }

  let updateUser = await userModel.findOneAndUpdate({ _id: userId }, data, { new: true })
      if (!updateUser) { return res.status(200).send({ status: true, message: "User not exist with this UserId." }) }
      return res.status(200).send({ status: true, message: "User profile updated", data: updateUser })

  } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
  }
}

module.exports = { createUser, loginUser, getUser, UpdateUser };
