const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const moment =require("moment")

const reviewSchema = new mongoose.Schema({

    bookId : {
        type :ObjectId,
        required: true,
        ref : "book"
    },
    reviewedBy: {
        type: String,
        default: "guest"
    },
    reviewedAt:{
        type: Date,
        required:true,
        trim:true
    },
    rating:{
        type: Number,
        required:true,
        min : 1,
        max : 5
    },
    review: String,
    isDeleted: {
        type :Boolean,
        default:false

    },
},
 { timestamps: true }
)
module.exports = new mongoose.model("review", reviewSchema);
    
 
