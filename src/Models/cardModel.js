const mongoose=require("mongoose")
const objectId = mongoose.type.objectId

const cardSchema = new mongoose.Schema({

    cardNumber  :{
        type:string
 },
    cardType :{
        type:String
    } ,
    customerName:{
        type:tring
    },
    status  :{
        type:string,
        defaut: Active
    },
    vision:{
        type:string
    },
    customerID:{
        type:String,
        ref:"customer"
    },
},{timestamps:true         
})

module.exports=new mongoose.model("card",cardSchema)