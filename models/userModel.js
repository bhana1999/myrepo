 const userSchema = new mongoose.Schema(
 
    { 
      title: {
        type: String,
        require:true,
        enum:["Mr", "Mrs", "Miss"]
      },
      name: {type:String,
        require:true,
      },
      phone: {
        type:String, 
        require:true, 
        unique:true
      },
      email: {
        type:String, 
        require:true, 
        unique:true,
      }, 
      password: {
        type:String,
         require:true, 
        // minLen 8, maxLen 15,
        },
      address: {
        street: {string},
        city: {string},
        pincode: {string}
      },
     
    },
    { timestamps: true }
  )
  module.exports = new mongoose.model("User", userSchema);
 