const express = require('express')

const router = express.Router()
const { getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload } = require("../controllers/productController")

router.get("/", getProducts)
router.get("/category/:categoryName", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/search/:serachQuery", getProducts);
router.get("/get-one/:id", getProductById);
router.get("/bestSellers", getBestSellers);

// admin routes:
router.get("/admin", adminGetProducts);
router.get("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUpload);

module.exports = router