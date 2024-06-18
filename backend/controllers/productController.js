const { decode } = require("punycode");
const recordsPerPage = require("../config/pagination")
const Product = require("../models/ProductModel");
const imageValidate = require("../utils/imageValidate")

const getProducts = async (req, res, next) => {
    // console.log("REQ", req);
    // Product.create({name: "Parasonic"})
    // res.send("Handling product routes, e.g search for products")
    try {
        let query = {};
        let priceQuery = {};
        let ratingQuery = {};
        let categoryQuery = {};
        const categoryName = req.params.categoryName || ""
        let queryCondition = false;
        if (req.query.price) {
            queryCondition = true;
            priceQuery = { price: { $lte: Number(req.query.price) } };
        }

        if (req.query.rating) {
            queryCondition = true;
            ratingQuery = { rating: { $in: req.query.rating.split(",") } };
        }

        // category from filter
        // http://localhost:3000/api/products?category=Games,Tablets
        if (req.query.category) {
            queryCondition = true;
            let a = req.query.category.split(",").map((item) => {
                if (item) return new RegExp("^" + item);
            });
            // console.log("a", a) = [ /^Games/, /^Tablets/ ]
            categoryQuery = { category: { $in: a } };
        }

        // category from search
        // http://localhost:3000/api/products/category/Tablets
        if (categoryName) {
            queryCondition = true;
            let a = categoryName.replaceAll(",", "/");
            var regEx = new RegExp("^" + a);
            categoryQuery = { category: regEx }
        }

        // http://localhost:3000/api/products?attrs=RAM-1 TB-2 TB,color-blue-red-black
        // attributes
        let attrsQueryCondition = [];
        if (req.query.attrs) {
            queryCondition = true;
            // attrs=RAM-1 TB-2 TB,color-blue-red-black
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if (item) {
                    let val = item.split("-");
                    let k = val.shift();
                    let a = {
                        attrs: { $elemMatch: { key: k, value: { $in: val } } }
                    }
                    acc.push(a);
                    return acc;
                } else return acc;
            }, []);
            // console.log(JSON.stringify(attrsQueryCondition))
        }

        // http://localhost:3000/api/products/search/Description
        // will serach for term "Description" in name or description fields.
        const serachQuery = req.params.serachQuery || "";
        let searchQueryCondition = {};
        let select = {};

        if (serachQuery) {
            queryCondition = true;
            searchQueryCondition = { $text: { $search: serachQuery } }
            // to search for specific string
            // searchQueryCondition = { $text: { $search: '"'+serachQuery+'"' } }

            // add new field in result
            // below adds search score, then you can sort results according to score.
            select = {
                score: { $meta: "textScore" }
            }
        }

        if (queryCondition) {
            query = {
                $and: [
                    priceQuery,
                    ratingQuery,
                    categoryQuery,
                    searchQueryCondition,
                    ...attrsQueryCondition
                ]
            }
        }


        const pageNum = Number(req.query.pageNum) || 1;
        const totalProducts = await Product.countDocuments({})
        //res.json({pageNum})

        //sort by name, price, etc.
        let sort = {}
        const sortOption = req.query.sort || "";
        if (sortOption) {
            let sortOpt = sortOption.split("_");
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
            console.log(sort)
        }


        // name:1 for ascending & -1 for desc
        // limit no of results per page in website
        // find is used when filter is applied.
        // skip is used in pagination, to show products according to page number
        // select , which fields needed to be fetched + you can add additional fields to the result.
        const products = await Product.find(query)
            .select(select)
            .skip(recordsPerPage * (pageNum - 1))
            .sort({ name: 1 })
            .limit(recordsPerPage)
        res.json({
            products,
            pageNum,
            paginationLinkNumbers: Math.ceil(totalProducts / recordsPerPage)
        })
    } catch (error) {
        next(error)
    }
}

// http://localhost:3000/api/products/get-one/6656dea3d668871e82b72122
const getProductById = async (req, res, next) => {
    try {
        // populate will fetch all data from reviews for gived id
        // if no popoulate it only fetches all review ids
        const product = await Product.findById(req.params.id).populate("reviews").orFail()
        res.json(product);
    } catch (err) {
        next(err)
    }
}

const getBestSellers = async (req, res, next) => {
    try {
        const product = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            { $match: { sales: { $gt: 0 } } },
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
            { $limit: 3 }
        ]);
        res.json(product);
    } catch (err) {
        next(err)
    }
}

const adminGetProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ category: 1 })
            .select('name price category');

        return res.json(products)
    } catch (err) {
        next(err)
    }
}

const adminDeleteProduct = async (req, res, next) => {
    try {
        console.log("req.params.id", req.params.id);
        const product = await Product.findById(req.params.id).orFail();
        console.log("product", product);
        await product.remove;
        res.json({ message: "product removed" });
    } catch (err) {
        next(err)
    }
}

// http://localhost:3000/api/products/admin
const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product()
        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name;
        product.description = description;
        product.count = count;
        product.price = price;
        product.category = category;
        if (attributesTable.length > 0) {
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }

        await product.save();

        // product._id automatically generated.
        res.json({
            message: "product created",
            productId: product._id
        })

    } catch (err) {
        next(err)
    }
}

const adminUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail();

        const { name, description, count, price, category, attributesTable } = req.body;
        product.name = name || product.name;
        product.description = description || product.description;
        product.count = count || product.count;
        product.price = price || product.price;
        product.category = category || product.category;
        if (attributesTable.length > 0) {
            product.attrs = []
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        } else {
            product.attrs = [];
        }

        await product.save();
        res.json({ message: "product updated" });
    } catch (err) {
        next(err)
    }
}

// http://localhost:3000/api/products/admin/upload (post)
const adminUpload = async (req, res, next) => {
    try {
        console.log("req.files", req.files)
        if (!req.files || !!req.files.images === false) {
            return res.status(400).send("No files were uploaded.")
        }

        const validateResult = imageValidate(req.files.images);

        if (validateResult.error) {
            return res.status(400).send(validateResult.error);
        }

        const path = require("path");
        const { v4: uuidv4 } = require("uuid")
        const uploadDirectory = path.resolve(__dirname, "../../frontend", "public", "images", "products");

        let product = await Product.findById(req.query.productId).orFail()
        let imagesTable = []

        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images
        } else {
            imagesTable.push(req.files.images)
        }

        for (let image of imagesTable) {
            // console.log(image);
            // console.log(path.extname(image.name));
            // console.log(uuidv4());

            var fileName = uuidv4() + path.extname(image.name);
            var uploadPath = uploadDirectory + "/" + fileName;
            product.images.push({ path: "/images/products/" + fileName })

            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
            })

        }

        await product.save();

        return res.send("Files uploaded!")

        /*  if (Array.isArray(req.files.images)) {
             res.send("You sent" + req.files.images.length + " images")
         } else {
             res.send("You sent only one image")
         } */
    } catch (err) {
        next(err)
    }
}

const adminDeleteProductImage = async (req, res, next) => {
    try {
        const imagePath = decodeURIComponent(req.params.imagePath);

        const path = require("path");
        const finalPath = path.resolve("../frontend/public") + imagePath;

        console.log("finalPath", finalPath);

        const fs = require("fs")
        fs.unlink(finalPath, (err) => {
            if (err) {
                res.status(500).send(err)
            }
        })

        await Product.findOneAndUpdate({ _id: req.params.productId },
            { $pull: { images: { path: imagePath } } }).orFail();

        return res.end();
    } catch (err) {
        next(err)
    }
}

module.exports = { getProducts, getProductById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage };