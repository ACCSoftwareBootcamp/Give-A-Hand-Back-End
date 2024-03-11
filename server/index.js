require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
//FOUNDATION 

const connectionString = process.env.MONGODB_URI


mongoose.connect(connectionString)
    .then(() => {
        console.log("Successfully connected to database")
    })
    .catch((error) => {
        console.log("Error connecting to the DB:", error)
    })


//MIDDLEWARE 
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())



//Routes
app.get('/', (req, res) => {
    res.send('I am the GROOT Route');
})


//LISTENER
app.listen(PORT, () => console.log("Server Running on Port:", PORT));