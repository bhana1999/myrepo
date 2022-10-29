const mongoose = require('mongoose'); // importing moongoose 

const newauthorSchema = new mongoose.Schema( { // creating schema
    authorName: String,
    age:Number,
    address:String,
    rating:Number

}, { timestamps: true });

module.exports = mongoose.model('NewAuthor', newauthorSchema) // here mongoose create model 
//from newauthorschema and store it in moongose and export it ,NewAuthor is our collection name 
//in our database

