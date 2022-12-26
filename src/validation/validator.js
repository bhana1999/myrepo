const mongoose = require("mongoose");

//=========================// isValidEmail //===================================

const isValidEmail = function (value) {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
  if (emailRegex.test(value)) return true;
};

//============================// idCharacterValid //============================

const isValidObjectId = function (value) {
  return mongoose.Types.ObjectId.isValid(value);
};

//==========================// isValidString //==================================

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//==============================// isValidName //===============================

const isValidName = function (name) {
  if (/^[a-z A-Z ]+$/.test(name)) {
    return true;
  }
};

//==============================// isValidMobile //===============================

const isValidPhone = function (phone) {
  if (/^[0]?[6789]\d{9}$/.test(phone)) {
    return true;
  }
};
//==============================// isValidPassword //==============================

const isValidPassword = function (password) {
  if (
    /^(?=.*[0-9])(?=.*[!.@#$%^&*])[a-zA-Z0-9!.@#$%^&*]{8,15}$/.test(password)
  ) {
    return true;
  }
};
//==============================// isValid-pincode //==============================

const isValidPincode = function (pincode) {
  if (/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(pincode)) return true;
  return false;
};

//=================//isValid-price//===================================================

const isValidPrice = (value) => {
  const regEx = /^[1-9]\d{0,8}(?:\.\d{1,2})?$/;
  const result = regEx.test(value);
  return result;
};

//===================//isValid-file//====================================================

const isValidFile = (img) => {
  const regex = /(\/*\.(?:png|gif|webp|jpeg|jpg|JPG|JPEG))/.test(img);
  return regex;
};

//=================//isValid-number//=====================================================

const isValidNumbers = function (value) {
  let user = /^[0-9]+$/.test(value);
  return user;
};

//=======================//isValid-size//================================================

const isValidAvailableSizes = (availablesizes) => {
  for (i = 0; i < availablesizes.length; i++) {
    if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(availablesizes[i]))
      return false;
  }
  return true;
};

//=============================// module exports //==============================

module.exports = {
  isValidName,
  isValidEmail,
  isValidObjectId,
  isValidString,
  isValidAvailableSizes,
  isValidFile,
  isValidNumbers,
  isValidPhone,
  isValidPrice,
  isValidPassword,
  isValidPincode,
};
