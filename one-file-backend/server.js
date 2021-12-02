// Back-End in one file
const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


// POST and PUT requests functionality
// Both are needed for POST and PUT calls (i.e. where we send infor in the request)
// This parses incoming requests with JSON payloads.  Allows us to recognize Request Object as a JSON Object.
// Without, we would get TypeErrors on our "post" calls https://www.geeksforgeeks.org/express-js-express-json-function
app.use(express.json());
// parses incoming requests with JSON with STRING or ARRAYS payloads.  
// Allows us to recognize Request Object as a string and/or an array
app.use(express.urlencoded({ extended: true }));


// Set up Mongoose, a library for MongoDB, our database and configure Mongo connection
const dbName = "animals";
// The connection is a promise and needs the then and catch
mongoose.connect('mongodb://localhost/' + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connection to ${dbName}  established`))
    .catch((err) => console.log(`Unable to establish a connection to ${dbName} the error is `, err))



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



// API Logic - routes and methods

app.get('/api/animals', (req, res) => {
    // use the model to connect to the collection and find/return all documents
    Animal.find({})//find all documents.  don't filter anything out
        .then((allAnimals) => {
            console.log(allAnimals);
            res.json({ theAnimals: allAnimals }) 
            // res.json( allAnimals ); can do it this way as well.  Probably do it this way more
        }) 
        .catch((err) => console.log(err));
})

//  if data is being sent to my server to create something new, we use a POST request
app.post('/api/animals', (req, res) => {
    Animal.create(req.body)
        .then((newAnimal) => {
            console.log(newAnimal);
            res.json(newAnimal);
        })
        .catch((err) => console.log(err));
})

app.get('/api/animals/:id', (req, res) => {
    Animal.findOne({ _id: req.params.id })
        .then((oneAnimal) => {
            console.log(oneAnimal);
            res.json(oneAnimal);
        })
        .catch((err) => console.log(err));
})

app.delete('/api/animals/:id', (req, res) => {
    Animal.deleteOne({ _id: req.params.id })
        .then((animalToDelete) => {
            console.log(animalToDelete);
            res.json(animalToDelete);
        })
        .catch((err) => console.log(err));
})

// The put is the most different from the others
app.put('/api/animals/:id', (req, res) => {
    Animal.findOneAndUpdate(
        // grab the id from the params
        { _id: req.params.id },
        // grab the request body
        req.body,
        // need both of these every time!!!
        { new: true, runValidators: true }
    )
        .then(updatedAnimal => {
            res.json({ updatedAnimal })
        })
        .catch((err)=> console.log(err));
})

// setting available port
const port = 8000;
// starts the server listening for requests
// takes in port then callback function in this case is calling the port in the callback
app.listen(port, () => {
    console.log(`Express is always ready to listen to your troubles on port ${port}`);
})