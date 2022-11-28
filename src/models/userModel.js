const mongoose = require("mongoose") 
 const userSchema = new mongoose.Schema(
 
    { 
      title: {
        type: String,
        required:true,
        enum:["Mr", "Mrs", "Miss"]
      },
      name: {type:String,
        required:true,
      },
      phone: {
        type:String, 
        required:true, 
        unique:true
      },
      email: {
        type:String, 
        required:true, 
        unique:true,
      }, 
      password: {
        type:String,
         required:true, 
        // minLen 8, maxLen 15,
        },
      address: {
        street: {type:String,required:true},
        city: {type:String,required:true},
        pincode: {type:String,required:true}
      },
     
    },
    { timestamps: true }
  )
  module.exports = new mongoose.model("User", userSchema);
 