const express = require('express')

const router = express.Router()
const { getUsers, registerUsers, loginUser, updateUserProfile, getUserProfile, writeReview } = require("../controllers/userController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");

router.post("/login", loginUser);
router.post("/register", registerUsers);

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile)
router.get("/", getUsers);
router.get('/profile/:id', getUserProfile);
router.post('/review/:productId', writeReview);


// admin routes:
router.use(verifyIsAdmin);


module.exports = router