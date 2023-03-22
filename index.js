const express = require("express");
const bodyParser = require("body-parser")
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

//Routes to auth router
app.use('/api/user', authRouter);

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`The server is running in ${PORT}`);
});