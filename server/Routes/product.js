const express = require("express");
const router = express.Router();

const productController = require("../Controllers/productController")


router.post('/add-product',productController.addProduct);
router.get('/get-product',productController.getProduct);
router.post('/delete-product',productController.deleteProduct);
router.post('/add-draft',productController.addDraft);


module.exports=router;