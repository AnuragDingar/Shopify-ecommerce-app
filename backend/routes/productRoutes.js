const express = require('express')

const router = express.Router()
const { getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage } = require("../controllers/productController");

const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");

router.get("/", getProducts)
router.get("/category/:categoryName", getProducts);
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/search/:serachQuery", getProducts);
router.get("/get-one/:id", getProductById);
router.get("/bestSellers", getBestSellers);

// admin routes:

router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);
router.post("/admin", adminCreateProduct);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUpload);
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage); // need imagePath to delete image from server ( we need full path), and we need product_id to delete in product collection.

module.exports = router