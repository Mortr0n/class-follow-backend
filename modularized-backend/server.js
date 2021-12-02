const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./config/mongoose.config');
require("./routes/animal.route")(app);
// Longhand:
// const animalRoutes = require("./routes/animal.route");
// animalRoutes(app);



const portNumber = 8000;

app.listen(8000, ()=>console.log(`Server connected on port ${portNumber}`));