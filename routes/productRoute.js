const express = require("express");
const { createProduct, getaProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getaProduct);
router.put('/:_id', updateProduct);
router.delete('/:_id', deleteProduct);
router.get('/', getAllProducts);
module.exports = router;
