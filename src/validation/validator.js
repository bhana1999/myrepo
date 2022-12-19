const mongoose = require('mongoose')
const ObjectId=require("mongoose").Types.ObjectId



function isValidBody(data) {
    if (Object.keys(data).length == 0)
      return false
    else return true
  }

  const isValidInputValue = function (data) {
    if (typeof (data) === 'undefined' || data === null) return false
    if (typeof (data) === 'string' && data.trim().length > 0) return true
    if (typeof (data) === 'object'|| Object.values(data) > 0 ) return true
    return false
  }

  const isValidObjectId = function (data) {
    let stringId = data.toString().toLowerCase();
    if (!ObjectId.isValid(stringId)) { return false; }
  
    var result = new ObjectId(stringId);
    if (result.toString() != stringId) {
        return false;
    }
    return true;
  }

  const isValidOnlyCharacters = function (data) {
    return /^[A-Za-z ]+$/.test(data)
  }
  
  function isValidEmail(data) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data))
      return false
    else return true
  }
//============phone number==============
  function isValidPhone(data) {
    if (/^[6-9][0-9]{9}$/.test(data))
      return true
    else return false
  }
//===============password====================
  const isValidPassword = function (password) {
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    return passwordRegex.test(password);
  };

//=======imagevalidation=================================
  const isValidImageType = function (data) {
    const reg = /image\/png|image\/jpeg|image\/jpg/;
    return reg.test(data)
  }
  //=========blank address================================

  const isValidAddress = function (data) {
    if (typeof (data) === "undefined" ||data === null) return false;
    if (typeof (data) === "object" && Array.isArray(data) === false && Object.keys(data).length > 0) return true;
    return false;
  };
  
  const isValidPincode = function(data){
    if ((/^[1-9][0-9]{5}$/.test(data))) {
      return true
    }
    return false
  }
  const isValidPrice = function(data){
    if ((/^[1-9][0-9]{2,5}\.[0-9]{2}|^[1-9][0-9]{2,5}$/).test(data)) {
  return true
    }
    return false
  }
  








  module.exports = { isValidBody,isValidInputValue,isValidObjectId,isValidOnlyCharacters,isValidEmail,isValidPhone,isValidPassword, isValidImageType,isValidAddress,isValidPincode,isValidPrice}