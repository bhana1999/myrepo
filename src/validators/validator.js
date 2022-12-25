const mongoose = require('mongoose')
const isValidObjectId = mongoose.Schema.Types.ObjectId


const isvalidMobileNumber = function (phone) {
    const MobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return MobileNumberRegex.test(phone);
}

const isvalidEmail = function (email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

const  isValidObjectIds =function(id){
    const check = isValidObjectId(id);
    return check
}
            

module.exports= {isvalidMobileNumber,isvalidEmail,isValidObjectIds,}
