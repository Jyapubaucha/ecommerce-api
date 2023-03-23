const express = require("express");
const { createProduct, getaProduct, getAllProducts, updateProduct } = require("../controllers/productController");
const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getaProduct);
router.put('/:_id', updateProduct);
router.get('/', getAllProducts);
module.exports = router;
