const mongoose = require("mongoose");

//__________________________ Validations : Name ___________________________________________

const isValidName = function (username) {
  const fnameRegex = /^[a-zA-Z][a-zA-Z ]*$/;
  return fnameRegex.test(username);
};
;

//__________________________ Validations : Email  ___________________________________________

const isValidEmail = function (email) {
  const emailRegex =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[com]+)*$/;
  return emailRegex.test(email);
};


//__________________________ Validations : MobileNumber  ___________________________________________

const isValidMobileNumber = function (mobile) {
  const MobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return MobileNumberRegex.test(mobile);
};


//__________________________ Export : Modules  ___________________________________________

module.exports = {
  
  isValidEmail,
  isValidName,
  
  isValidMobileNumber,
  
};