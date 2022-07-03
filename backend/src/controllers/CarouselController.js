/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Carousel = require('../models/CarouselModel');
const Joi = require("joi");
const cloudinary = require("../middleware/cloudinary");
const { isValidObjectId } = require('mongoose');


//Add carousel on the database
module.exports.addCarousel = async (req, res) => {
    const { title, description, color_bg, image } = req.body;

    try {
        const schema = Joi.object({
            title: Joi.string().min(3).max(20).required(),
            description: Joi.string().min(3).max(200).required(),
            color_bg: Joi.string().min(3).max(50).required(),
            image: Joi.string().dataUri()
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const existCarousel = await Carousel.findOne({ title });
        if (existCarousel) return res.status(400).json({ errorMessage: "Carousel already exist!" });

        const pathName = req.file.path;

        const uploadedResponse = await cloudinary.uploader.upload(pathName, {
            upload_preset: "dev_carousels",
        });

        if (uploadedResponse) {
            const newCarousel = new Carousel({
                title,
                description,
                color_bg,
                image: uploadedResponse.secure_url,
                cloudinary_id: uploadedResponse.public_id,
            });

            if (!newCarousel) return res.status(500).send('The carousel cannot be created!');

            await newCarousel.save();
            res.status(200).json({ newCarousel });
        }
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Get carousel on the database
module.exports.getCarousel = async (req, res) => {
    try {
        const ListCarousel = await Carousel.find();

        if (!ListCarousel)
            res.status(500).json({ success: false })
        res.status(200).send(ListCarousel);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Modify carousel on the database
module.exports.modifyCarousel = async (req, res) => {

    const idCarousel = req.params.id;

    try {

        const schema = Joi.object({
            title: Joi.string().min(3).max(20),
            description: Joi.string().min(3).max(200),
            color_bg: Joi.string().min(3).max(50),
            image: Joi.string().dataUri()
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        if (!isValidObjectId(idCarousel))
            return res.status(500).json({ success: false, message: 'Invalid ID: ' + idCarousel })

        let carousel = await Carousel.findById(req.params.id);

        let imagepath, cld_id, uploadedResponse;

        if ((req?.file === "") || (req?.file === undefined)) {

            imagepath = carousel.image;
            cld_id = carousel.cloudinary_id;

        } else {

            await cloudinary.uploader.destroy(carousel.cloudinary_id);

            const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
                upload_preset: "dev_carousels",
            });

            imagepath = uploadedResponse.secure_url;
            cld_id = uploadedResponse.public_id;
        }

        const data = {
            title: req.body.title || carousel.title,
            description: req.body.description || carousel.description,
            color_bg: req.body.color_bg || carousel.color_bg,
            image: imagepath,
            cloudinary_id: cld_id,
        }

        if (!data) return res.status(500).send('The carousel cannot be updated!');

        const updatedCarousel = await Carousel.findByIdAndUpdate(
            idCarousel, data, { new: true }
        );

        const message = "Carousel updated!";
        res.status(200).json(message);

    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Delete carousel on the database
module.exports.deleteCarousel = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id))
            res.status(500).json({ message: 'Invalid ID: ' + req.params.id })

        let carousel = await Carousel.findById(req.params.id);
        if (carousel) {
            await cloudinary.uploader.destroy(carousel.cloudinary_id);
            await carousel.remove();
            return res.status(200).json({ success: true, message: 'Carousel deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "Carousel not found!" })
        }
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};
