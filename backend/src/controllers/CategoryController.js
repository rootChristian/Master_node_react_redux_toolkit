/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Category = require('../models/CategoryModel');
const ObjectID = require('mongoose').Types.ObjectId;

const { isValidObjectId } = require('mongoose');

//Add category on the database
module.exports.addCategory = async (req, res) => {

    const { name, image } = req.body;

    try {
        /*const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/categories/`;
        */
        const existCategory = await Category.findOne({ name });
        if (existCategory) return res.status(400).json({ errorMessage: "Category already exist!", });

        const newCategory = await Category.create({
            name: req.body.name,
            image, //image: `${basePath}${fileName}`, // "http://localhost:3000/public/uploads/categories/image-123456"
        });

        if (!newCategory) return res.status(500).send('The category cannot be created');

        //res.status(200).send('The Category ' + newCategory.name +  ' added successfully');
        res.status(200).json(newCategory);
    }
    catch (err) {
        res.status(500).json({
            errorMessage: " Failed, please try again!",
        });
    };
};

//Get categories on the database
module.exports.getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();

        if (!categoryList)
            res.status(500).json({ success: false })
        res.status(200).send(categoryList);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Get category on the database
module.exports.getCategory = async (req, res) => {

    try {
        if (!isValidObjectId(req.params.id)) return res.status(500).json({ success: false, message: 'Invalid ID: ' + req.params.id })

        const category = await Category.findById(req.params.id);

        if (!category)
            return res.status(404).json({ success: false, message: "Category not found!" })
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Modify category on the database
module.exports.modifyCategory = async (req, res) => {
    const idCategory = req.params.id;

    try {
        if (!isValidObjectId(idCategory))
            return res.status(500).json({ success: false, message: 'Invalid ID: ' + idCategory })


        const file = req.file;
        let imagepath;

        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/categories/`;
            imagepath = `${basePath}${fileName}`;
        } else {
            const category = await Category.findById(idCategory);
            imagepath = category.image;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            idCategory,
            {
                name: req.body.name,
                image: imagepath, // "http://localhost:8000/public/upload/image-123456"
            },
            { new: true }
        );

        if (!updatedCategory) return res.status(500).send('The category cannot be updated!');

        res.status(200).json(updatedCategory);

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Delete category on the database
module.exports.deleteCategory = async (req, res) => {
    if (!isValidObjectId(req.params.id))
        res.status(500).json({ message: 'Invalid ID: ' + req.params.id })
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'The category is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "Category not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
};