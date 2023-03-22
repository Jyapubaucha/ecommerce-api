const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//create new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch (error) {
        throw new Error(error);
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
        const getAllProducts = await Product.find();
        res.json(getAllProducts);
    }
    catch (error) {
        throw new Error(error);
    }
});


module.exports = { createProduct, getaProduct, getAllProducts };