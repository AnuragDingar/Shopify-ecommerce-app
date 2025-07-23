const express = require('express')

const router = express.Router()
const { getUsers, registerUsers, loginUser, updateUserProfile, getUserProfile, writeReview, getOneUser, updateUser, deleteUser } = require("../controllers/userController")
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");

router.post("/login", loginUser);
router.post("/register", registerUsers);

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile)

router.get('/profile/:id', getUserProfile);
router.post('/review/:productId', writeReview);


// admin routes:
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router