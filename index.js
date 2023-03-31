const express = require("express");
const bodyParser = require("body-parser")
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

connectDb();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

//Routes to user features
app.use('/api/user', authRouter);

//Router to product features
app.use('/api/product',productRouter);

//Router to blog features
app.use('/api/blog', blogRouter);

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`The server is running in ${PORT}`);
});