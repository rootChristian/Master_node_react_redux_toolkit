/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Category = require('../models/CategoryModel');
const ObjectID = require('mongoose').Types.ObjectId;
const { isValidObjectId } = require('mongoose');
const Joi = require("joi");
const cloudinary = require("../middleware/cloudinary");

//Add category on the database
module.exports.addCategory = async (req, res) => {

    const { name, image } = req.body;

    try {

        const schema = Joi.object({
            name: Joi.string().min(3).max(20).required(),
            image: Joi.string().dataUri(),
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const existCategory = await Category.findOne({ name });
        if (existCategory) return res.status(400).json({ errorMessage: "Category already exist!", });

        //const pathName = req.file.path;

        const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
            upload_preset: "dev_categories",
        });

        if (uploadedResponse) {
            const newCategory = new Category({
                name,
                image: uploadedResponse.secure_url,
                cloudinary_id: uploadedResponse.public_id,
            });

            if (!newCategory) return res.status(500).send('The category cannot be created');

            await newCategory.save();
            res.status(200).json({ newCategory });
        }
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Get categories on the database
module.exports.getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();

        if (!categoryList)
            res.status(500).json({ success: false })
        res.status(200).send(categoryList);
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
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
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Modify category on the database
module.exports.modifyCategory = async (req, res) => {

    const idCategory = req.params.id;

    try {

        const schema = Joi.object({
            name: Joi.string().min(3).max(20),
            image: Joi.string().dataUri(),
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        if (!isValidObjectId(idCategory))
            return res.status(500).json({ success: false, message: 'Invalid ID: ' + idCategory })

        let category = await Category.findById(req.params.id);

        let imagepath, cld_id, uploadedResponse;

        if ((req?.file === "") || (req?.file === undefined)) {

            imagepath = category.image;
            cld_id = category.cloudinary_id;

        } else {
            await cloudinary.uploader.destroy(category.cloudinary_id);

            uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
                upload_preset: "dev_categories",
            });

            imagepath = uploadedResponse.secure_url;
            cld_id = uploadedResponse.public_id;
        }

        const data = {
            name: req.body.name || category.name,
            image: imagepath,
            cloudinary_id: cld_id,
        }

        if (!data) return res.status(500).send('The category cannot be updated!');

        const updatedCategory = await Category.findByIdAndUpdate(
            idCategory, data, { new: true }
        );

        const message = "Category updated!";
        res.status(200).json(message);

    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Delete category on the database
module.exports.deleteCategory = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id))
            res.status(500).json({ message: 'Invalid ID: ' + req.params.id })

        let category = await Category.findById(req.params.id);
        if (category) {
            await cloudinary.uploader.destroy(category.cloudinary_id);
            await category.remove();
            return res.status(200).json({ success: true, message: 'Category deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "Category not found!" })
        }
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};