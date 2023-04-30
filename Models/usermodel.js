const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------Creating Schema(structure for database)-----------------//


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true,
        minLen:8,
        maxLen:15,
        trim:true
    },
    mobile: {
        type: Boolean,
        required: true
        
    },
    address: {
        type: String,

    }
}, { timestamps: true });


module.exports = mongoose.model("userr", userSchema)
