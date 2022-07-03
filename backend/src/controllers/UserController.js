/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const generateAuthToken = require("../middleware/generateAuthToken");
const User = require('../models/UserModel')
const CryptoJS = require('crypto-js');
const { isValidObjectId } = require('mongoose');
const cloudinary = require("../middleware/cloudinary");
const Joi = require("joi");

//registration user on the database 
module.exports.createUser = async (req, res) => {

    const { firstname, lastname, email, password, gender, role, image } = req.body;

    const patt = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:."?]).{6,}$';

    try {
        const schema = Joi.object({
            firstname: Joi.string().min(3).max(30).required(),
            lastname: Joi.string().min(3).max(30).required(),
            email: Joi.string().min(3).max(50).required().email(),
            password: Joi.string().min(8)
                .pattern(new RegExp(patt))
                .label("Password")
                .messages({
                    "string.min": "Password must have at least 8 characters",
                    "object.regex": "Password must have at least 8 characters",
                    "string.pattern.base": "The password must have a minimum of 8 characters which contains at least one number, one symbol, uppercase and lowercase letters."
                })
                .required(),
            gender: Joi.string().required(),
            role: Joi.string().min(4).max(5).required(),
            image: Joi.string(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exist...");

        if (role !== "USER" &&
            role !== "ADMIN" &&
            role !== "ROOT") return res.status(400).send("Wrong role!");

        let imagepath, cld_id, uploadedResponse;

        if (req.body.image || req?.file) {
            uploadedResponse = await cloudinary.uploader.upload(req.body.image /*req.file.path*/, {
                upload_preset: "dev_users",
            });
            imagepath = uploadedResponse.secure_url;
            cld_id = uploadedResponse.public_id;
        } else {
            imagepath = "https://res.cloudinary.com/dcdkw4ylr/image/upload/v1656672072/logo/gjn19n4yvlex8y0qn1w4.png";
            cld_id = "logo/gjn19n4yvlex8y0qn1w4";
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.SECRET_CRYPTOJS).toString(),
            gender,
            role,
            image: imagepath,
            cloudinary_id: cld_id,
        });

        if (!newUser) {
            const message = "the user cannot be created!";
            res.status(400).send({ message });
            return;
        }

        //const token = generateAuthToken(newUser);
        await newUser.save();
        const message = "User create successfully.";
        res.status(201).json({ message });

    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Get users on the database
module.exports.getUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().select('-password').sort({ _id: -1 }).limit(5)
            : await User.find().select('-password');
        //const users = await User.find().select('-password');

        if (!users) {
            res.status(500).json({ success: false })
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Get user on the database
module.exports.getUser = async (req, res) => {
    if (!isValidObjectId(req.params.id))
        res.status(500).json({ message: 'Invalid ID: ' + req.params.id })
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user)
            res.status(500).json({ message: 'User not found!' })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Modify user on the database
module.exports.modifyUser = async (req, res) => {

    const idUser = req.params.id;

    const patt = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:."?]).{6,}$';

    try {

        const schema = Joi.object({
            firstname: Joi.string().min(3).max(20),
            lastname: Joi.string().min(3).max(20),
            email: Joi.string().min(3).max(50).email(),
            password: Joi.string().min(8).max(1024)
                .pattern(new RegExp(patt))
                .label("Password")
                .messages({
                    "string.min": "Must have at least 8 characters",
                    "object.regex": "Must have at least 8 characters",
                    "string.pattern.base": "The password must have a minimum of 8 characters which contains at least one number, one symbol, uppercase and lowercase letters."
                }),
            gender: Joi.string(),
            role: Joi.string().min(4).max(5),
            image: Joi.string().dataUri(),
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        if (!isValidObjectId(idUser)) res.status(500).json({ message: 'Invalid ID: ' + idUser })

        let user = await User.findById(req.params.id);

        let imagepath, cld_id, uploadedResponse;

        if ((req?.file === "") || (req?.file === undefined)) {

            imagepath = user.image;
            cld_id = user.cloudinary_id;

        } else {
            if (user.cloudinary_id)
                await cloudinary.uploader.destroy(user.cloudinary_id);

            uploadedResponse = await cloudinary.uploader.upload(req.body.image /*req.file.path*/, {
                upload_preset: "dev_users",
            });

            imagepath = uploadedResponse.secure_url;
            cld_id = uploadedResponse.public_id;
        }

        const data = {
            firstname: req.body.firstname || user.firstname,
            lastname: req.body.lastname || user.lastname,
            email: req.body.email || user.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_CRYPTOJS).toString(),
            gender: req.body.gender || user.gender,
            gender: req.body.role || user.role,
            image: imagepath,
            cloudinary_id: cld_id,
        }

        if (!data) return res.status(500).send('The user cannot be updated!');

        const updatedUser = await User.findByIdAndUpdate(
            idUser, data, { new: true }
        );

        const message = "User updated!";
        res.status(200).json(message);

    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

//Delete user on the database
module.exports.deleteUser = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id))
            res.status(500).json({ message: 'Invalid ID: ' + req.params.id })

        let user = await User.findById(req.params.id);
        if (user) {
            if (user.cloudinary_id)
                await cloudinary.uploader.destroy(user.cloudinary_id);
            await user.remove();
            return res.status(200).json({ success: true, message: 'User deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "User not found!" })
        }
    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};


//Get user statistic
module.exports.getStatUser = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",  // Get the number of month
                    total: { $sum: 1 },  // return the total item on the month
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err });
    }
};