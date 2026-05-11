const express = require("express")

const app = express()

const productRoutes = require("./productRoutes")
const userRoutes = require("./userRoutes")
const categoriesRoutes = require("./categoriesRoutes")
const ordersRoutes = require("./ordersRoutes")

const jwt = require("jsonwebtoken");

app.get("/get-token", (req, res) => {
    try {
        const accessToken = req.cookies["access_token"];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        console.log("decoded", decoded);
        return res.json({ token: decoded.isAdmin ? "admin" : "user", isAdmin: decoded.isAdmin })
    } catch (err) {
        return res.status(401).send("Unautorized. Invalid Token");
    }
});

app.get("/logout", (req, res) => {
    return res.clearCookie("access_token").send("access token cleared");
});


app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/orders", ordersRoutes);

module.exports = app