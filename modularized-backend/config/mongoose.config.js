const mongoose = require('mongoose');

// Set up Mongoose, a library for MongoDB, our database and configure Mongo connection
const dbName = "animals";
// The connection is a promise and needs the then and catch
mongoose.connect('mongodb://localhost/' + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connection to ${dbName}  established`))
    .catch((err) => console.log(`Unable to establish a connection to ${dbName} the error is `, err))