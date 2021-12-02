const Animal = require('../models/animal.model');


module.exports = {

    findAllAnimals: (req, res) => {
        // use the model to connect to the collection and find/return all documents
        Animal.find({})//find all documents.  don't filter anything out
            .then((allAnimals) => {
                console.log(allAnimals);
                res.json({ theAnimals: allAnimals }) 
                // res.json( allAnimals ); can do it this way as well.  Probably do it this way more
            }) 
            .catch((err) => console.log(err));
    },

    createAnimal: (req, res) => {
        Animal.create(req.body)
            .then((newAnimal) => {
                console.log(newAnimal);
                res.json(newAnimal);
            })
            .catch((err) => console.log(err));
    },

    findOneAnimal: (req, res) => {
        Animal.findOne({ _id: req.params.id })
            .then((oneAnimal) => {
                console.log(oneAnimal);
                res.json(oneAnimal);
            })
            .catch((err) => console.log(err));
    },

    deleteAnimal: (req, res) => {
        Animal.deleteOne({ _id: req.params.id })
            .then((animalToDelete) => {
                console.log(animalToDelete);
                res.json(animalToDelete);
            })
            .catch((err) => console.log(err));
    },

    updateAnimal: (req, res) => {
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
    },

}

// ALTERNATIVE WAY THAT PLATFORM DOES IT.  THEY USE 
// MODULE.EXPORT.KEY_NAME FOR EVERY SINGLE METHOD

// ALTERNATIVE
// module.exports.findallAnimals = (req, res) =>{
//     Animal.find()
//         .then(allAnimals => res.json({ animals: allAnimals }));
//         .catch(err => res.json({ message: 'something went wrong', error: err}));
// }