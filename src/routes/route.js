const express = require('express');
const _ = require('lodash');
const router = express.Router();///test-you
//importing a custom module
//const xyz = require('../logger/logger.js')
//const zyx = require('../util/helper.js')
//const yzx = require('../validator/formatter.js')
//importing external package
//const underscore = require('underscore')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    //console.log("Calling my function ",xyz.myFunction())
    //console.log("The value of the constant is ",xyz.myUrl)
    //Trying to use an external package called underscore
    //let myArray = ['Akash', 'Pritesh', 'Sabiha']
    //let result = underscore.first(myArray)
    //console.log("The result of underscores examples api is : ", result)
    //console.log(xyz.welcome())
    //console.log(zyx.printDate())
    //console.log(zyx.printMonth())
    //console.log(zyx.getBatchinfo())
    //console.log(yzx.trim())
    //console.log(yzx.changeTolowercase())
   //console.log(yzx.changeTouppercase())
  //let ym = ['jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
  //console.log(_.chunk(ym,4))
  //let oddnum = [1,3,5,7,9,11,13,15,17,19]// removing first element by using tail method
  //console.log(_.tail(oddnum))
  //let duplicate =[3,4,3,5,4]
  //let duplicate_1 =[5,6,3,7,4]
  //let duplicate_2 =[8,4,9,5,4]
  //let duplicate_3=[5,4,4,5,20]
  //let duplicate_4=[2,6,3,5,8]
  //console.log(_.union(duplicate,duplicate_1,duplicate_2,duplicate_3,duplicate_4))
 //remove duplicacy
 let pairs = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
 let obj = _.fromPairs(pairs)
 console.log(obj)//array of aaray in pairs with the help of this method we convert pairs in which array of arrayy store into key value pair





    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});

module.exports = router;

