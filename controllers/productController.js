const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


//create new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch (error) {
        throw new Error(error);
    }
});

//Update product
const updateProduct = asyncHandler(async (req, res) => {
    const _id = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProductt = await Product.findOneAndUpdate({ _id }, req.body, {
            new: true,

        })
        res.json(updateProductt)
    }
    catch (error) {
        throw new Error(error);
    }
});

//Delete Product with id
const deleteProduct = asyncHandler(async (req, res) => {
    const _id = req.params;

    try {
        const deleteProduct = await Product.findOneAndDelete({ _id });
        res.json(deleteProduct);
    }
    catch (err) {
        throw new Error(err);
    }
});


//get a single product with id
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    }
    catch (error) {
        throw new Error(error);
    }
})

//get add products from database
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        //Filtering products with price
        //Postman routes
        //Notes
            //gte = greater than equal to
            //gt= greater than
            //lte = less than equal to
            //lt= less than

        //localhost:5001/api/product?price[gte]=100000&price[lte]=200000

        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        //Sorting 
        //localhost:5001/api/product?sort=-category,-brand or category,brand
        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt')
        } 

        const product = await query;
        res.json(product);
    }
    catch (error) {
        throw new Error(error);
    }
});


module.exports = { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct };