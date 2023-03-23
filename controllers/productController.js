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
        const getAllProducts = await Product.find();
        res.json(getAllProducts);
    }
    catch (error) {
        throw new Error(error);
    }
});


module.exports = { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct };