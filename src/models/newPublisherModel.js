const mongoose = require('mongoose');//importing mongoose

const newapublisherSchema = new mongoose.Schema({// create schema

    name: String,
    headQuarter: String,

}, { timestamps: true });

module.exports = mongoose.model('newPublisher', newapublisherSchema)// exporting our schema







