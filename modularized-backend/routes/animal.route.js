// Remember how the routes and the controller info used to be together?
// We need to import it and still inclued it in our get call below!
// Now, it's much simpler, because we are exporting an object of key-value pairs from our controller.
// Rather than writing the ENTIRE function, we simply access it using AnimalController.findAllAnimals

const animalController = require('../controllers/animal.controller');
const AnimalController = require('../controllers/animal.controller');

// Exporting an arrow function with a parameter of app that contains five statements
// We import in server.js like this: require("./routes/animal.routes")(app)

module.exports = (app) => {
    app.get('/api/animals', animalController.findAllAnimals);
    app.get('/api/animals/:id', animalController.findOneAnimal);
    app.put('/api/animals/:id', animalController.updateAnimal);
    app.post('/api/animals', animalController.createAnimal);
    app.delete('/api/animals/:id', animalController.deleteAnimal);
}