const mongoose=require("mongoose")
const objectId = mongoose.type.objectId

const customerSchema = new mongoose.Schema({
   
    firstName :{
        type:String
    },
    lastName:{
        type:String
    },
    mobileNumber :{
        type:String,
        length:10
    },
    DOB : {
        type:date()
    },
    emailID :{
        type:String,

    },
    address  :{
        type:String
    },
    customerID :{
        type:String
    },
    status :{
        type:String,
        enum:["ACTIVE","INACTIVE"]
    } ,
},{timestamps:true})

module.exports=new mongoose.model("customer",customerSchema)