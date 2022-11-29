
const mongoose = require("mongoose");

const isvalidpassword = function (password) {
    const passwordRegex = 	/^(?=.*\d).{8,15}$/; // atleast one numericdigit
    return passwordRegex.test(password);
};

const isvalidMobileNumber = function (phone) {
    const MobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return MobileNumberRegex.test(phone);
};

const isvalidEmail = function (email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[com]+)*$/;
    return emailRegex.test(email);
};

const isvaliduserId = function (userId) {
    return mongoose.Types.ObjectId.isValid(userId);
  };

module.exports = {
    isvalidpassword,
    isvalidMobileNumber,
    isvalidEmail,
    isvaliduserId,
};