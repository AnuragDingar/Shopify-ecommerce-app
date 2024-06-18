const express = require('express')

const router = express.Router()
const { getUserOrders, getOrder, createOrder, updatedOrderToPaid, updatedOrderToDelivered, getAdminOrders, getOrderForAnalysis } = require("../controllers/ordersController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");


// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updatedOrderToPaid);

// admin routes
router.use(verifyIsAdmin);
router.put("/delivered/:id", updatedOrderToDelivered);
router.get("/admin", getAdminOrders);
router.get("/analysis/:date", getOrderForAnalysis);

module.exports = router