/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel')
const ObjectID = require('mongoose').Types.ObjectId;

const { isValidObjectId } = require('mongoose');

//Add product on the database
module.exports.addProduct = async (req, res) => {
    const { name, description, quantity, price, image, category, size, color, inStock } = req.body;

    try {
        /*const file = req.file;
        if (!file) return res.status(400).send('No image in the request');

        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/products/`;
        */
        const existProduct = await Product.findOne({ name });
        if (existProduct) return res.status(400).json({ errorMessage: "Product already exist!", });

        if (!isValidObjectId(req.body.category)) return res.status(500).json({ success: false, message: 'Invalid ID: ' + req.body.category })

        const existCategory = await Category.findById(category)
        if (!existCategory) return res.status(400).json({ errorMessage: "Category not found!", });

        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.body.image, //image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/products/image-123456"
            category: req.body.category,
            size: req.body.size,
            color: req.body.color,
            inStock: req.body.inStock,
        });

        if (!newProduct) {
            const message = "The product cannot be created!";
            res.status(400).send({ message });
            return;
        }
        const message = "The produuct " + newProduct.name + " added successfully in category " + existCategory.name + "!";
        res.status(200).json({ newProduct, message });

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Get products on the database
module.exports.getProducts = async (req, res) => {
    const queryNew = req.query.limit;
    //const queryCategory = req.query.category;
    try {
        let products;

        if (queryNew)
            products = await Product.find().sort({ createdAt: -1 }).limit(6);
        /*else if (queryCategory)
            products = await Product.find({
                categories: { $in: [queryCategory] }
            });*/
        else
            products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Get product on the database
module.exports.getProduct = async (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(500).json({ success: false, message: 'Invalid ID: ' + req.params.id })
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ success: false, message: "Product not found!" })
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Get products by category
module.exports.productByCategory = async (req, res) => {
    const idCategory = req.params.id;

    try {
        if (!isValidObjectId(idCategory)) return res.status(500).json({ success: false, message: 'Invalid ID: ' + idCategory })

        const existCategory = await Category.findById(idCategory)
        if (!existCategory) return res.status(400).json({ errorMessage: "Category not found!", });

        const byCategory = await Product.find({ category: existCategory });

        if (byCategory) res.status(200).json(byCategory);

    } catch (err) {
        return res.status(403).json({ message: err });
    }
};

//Modify products on the database
module.exports.modifyProduct = async (req, res) => {
    const idProduct = req.params.id;

    if (!isValidObjectId(idProduct))
        return res.status(500).json({ success: false, message: 'Invalid ID: ' + idProduct })

    try {
        let imagepath;
        const file = req.file;

        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/products/`;
            imagepath = `${basePath}${fileName}`;
        } else {
            const product = await Product.findById(idProduct);
            imagepath = product.image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            idProduct,
            {
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                size: req.body.size,
                image: imagepath, // "http://localhost:8000/public/upload/products/image-123456"
                category: req.body.category,
            },
            { new: true }
        );

        if (!updatedProduct) return res.status(500).send('The product cannot be updated!');

        res.status(200).json(updatedProduct);

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Delete product on the database
module.exports.deleteProduct = async (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(500).json({ success: false, message: 'Invalid ID: ' + req.params.id })

    Product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'The product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
};
