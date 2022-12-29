const loginuser = async function(req,res){
    try{
    const data = req.body
    
    const {email,password} = data


    const data1 = await userModel.findOne({email : email})

    let encryptPwd = data1.password;

    await bcrypt.compare(password, encryptPwd, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { _id: data1._id.toString() },
          "lithiumproject5",
          {
            expiresIn: "1h",
          }
        );
        res.setHeader("x-api-key", token);

        return res.status(201).send({status: true,message: "User logged in  successfully",data: { userId: data1._id, token: token },});
      } else {
        return res.status(401).send({ status: false, message: "Incorrect info" });
      }
    });
}catch (err) {
    res.status(500).send({ staus: false, message: err.message });
  }
}
