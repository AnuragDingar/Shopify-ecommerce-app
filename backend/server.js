const express = require('express')
const app = express()
const port = 3000
const apiRoutes = require("./routes/apiRoutes")

app.get('/', async(req, res, next) => {
    const Product = require("./models/ProductModel")
    try {
        const product = new Product
        product.name = "New product name"
        const productSaved = await product.save()
        console.log(productSaved === product)
        const products = await Product.find()
        console.log(products.length)
        res.send("Product created" + product._id)
    } catch(error) {
        next(error);
    }
    //res.json({message: "API running..."})
})

// mongoose connection
const connectDB = require("./config/db")
connectDB();
/* app.get('/a', (req, res, next) => {
    setTimeout(() => {
        try {
            aconsole.log("asyncronous code");
        } catch (er) {
            next(er);
        }
    },1000)
}) */

app.use((error, req, res, next) => {
    console.error(error);
    next()
})
app.use('/api', apiRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})