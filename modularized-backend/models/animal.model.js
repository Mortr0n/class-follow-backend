const mongoose = require('mongoose');

// Model and Schema to shape/structure the document and connect with a specific collection in the db
const AnimalSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    age: {
        type: Number,
    },

    weight: {
        type: Number,
    },

    isFurry: {
        type: Boolean,
    }

    // timestamps automatically create "createdAt" and "updatedAt" date and time info for each document
    // every time a doc is updated it will change the updatedAt
}, { timestamps: true })
// The Model is a combination of the 
// 1. CollectionName which will be a singular, capitalized version of the collection name that's held in the db
// 2. the Schema
const Animal = mongoose.model('Animal', AnimalSchema);
//  Mongoose model provides an interface to the database for creating, reading, updating and deleting records

module.exports = Animal;