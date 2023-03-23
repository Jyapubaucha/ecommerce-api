const express = require("express");
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

//Authenticate the product and give access to update, delete product
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/:id', getaProduct);
router.put('/:_id',authMiddleware, isAdmin, updateProduct);
router.delete('/:_id',authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProducts);
module.exports = router;
