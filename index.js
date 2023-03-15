const express = require('express');
const connectDb = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();

connectDb();

const PORT = process.env.PORT || 4000;

app.use('/', (req,res) => {
    res.send('Hello World');
});

app.listen(PORT,() => {
    console.log(`The server is running in ${PORT}` );
});