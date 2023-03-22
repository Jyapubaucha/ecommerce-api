const express = require("express");
const { createProduct, getaProduct } = require("../controllers/productController");
const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getaProduct);
module.exports = router;
