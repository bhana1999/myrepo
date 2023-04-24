const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------Creating Schema(structure for database)-----------------//


const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true
     },
     
    verified: { 
        type: Boolean,
         required: true
         }
}, { timestamps: true });


module.exports = mongoose.model("userr" , userSchema)
