const express = require("express");
const bodyParser = require("body-parser")
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute");

connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const PORT = process.env.PORT || 4000;

app.use('/api/user', authRouter);

app.listen(PORT, () => {
    console.log(`The server is running in ${PORT}`);
});