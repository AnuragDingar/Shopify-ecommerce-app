const express = require("express")

const app = express()

const productRoutes = require("./productRoutes")
const userRoutes = require("./userRoutes")
const categoriesRoutes = require("./categoriesRoutes")
const ordersRoutes = require("./ordersRoutes")

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/orders", ordersRoutes);

module.exports = app