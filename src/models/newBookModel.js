const mongoose = require('mongoose'); // importing moongoose library
const ObjectId = mongoose.Schema.Types.ObjectId;//defining type of property as objectid 

const newBookSchema = new mongoose.Schema({ // creating schema

    name: String,
    newauthor_id: {
        type: ObjectId, // giving type of newauthor_id
        ref: "NewAuthor"//give a reference of NewAuthor collection
    },
    price: Number,
    ratings: Number,
    newPublisher_id: {
        type: ObjectId,
        ref: "newPublisher"
    }
}, { timestamps: true });

module.exports = mongoose.model('NewBook1', newBookSchema)//we are exporting schema here








