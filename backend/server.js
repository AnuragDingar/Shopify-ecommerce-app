const express = require('express')
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const app = express()
const port = 5000
const apiRoutes = require("./routes/apiRoutes")

// to recognise json data
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

app.get('/', async (req, res, next) => {
    const Product = require("./models/ProductModel")
    try {
        const product = new Product
        product.name = "New product name"
        const productSaved = await product.save()
        console.log(productSaved === product)
        const products = await Product.find()
        console.log(products.length)
        res.send("Product created" + product._id)
    } catch (error) {
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

app.use('/api', apiRoutes);

app.use((error, req, res, next) => {
    // no need to show errors in production
    if (process.env.NODE_ENV === "development") {
        res.status(500).json({
            message: error.message,
            stack: error.stack,
        })
    } else {
        res.status(500).json({
            message: error.message
        })
    }

    console.error(error);
    next(error)
});

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack,
    });
    //next()
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})