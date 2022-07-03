/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const generateAuthToken = require("../middleware/generateAuthToken");
const User = require('../models/UserModel');
const CryptoJS = require('crypto-js');
const Joi = require("joi");
const cloudinary = require("../middleware/cloudinary");

//Check user on the database to login
module.exports.signIn = async (req, res) => {
    const maxAge = "1h"; //1 * 24 * 60 * 60 * 1000;
    try {
        const schema = Joi.object({
            email: Joi.string().min(3).max(50).required().email(),
            password: Joi.string().min(6).max(1024).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password...");

        const passwordHash = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_CRYPTOJS
        );
        const originPassword = passwordHash.toString(CryptoJS.enc.Utf8);

        if (originPassword !== req.body.password) {
            res.status(401).send({ message: "Invalid email or password..." });
            return;
        }

        const token = generateAuthToken(user);

        // Save cookie
        res.cookie('x-access-token', token, { httpOnly: true, expiresIn: maxAge });

        const message = "Login successfully.";
        res.status(200).json({ message, token });

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//registration user on the database 
module.exports.signUp = async (req, res) => {

    const { firstname, lastname, email, password, gender, image } = req.body;

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
            image: Joi.string(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exist...");

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
            image: imagepath,
            cloudinary_id: cld_id,
        });

        if (!newUser) {
            const message = "the user cannot be created!";
            res.status(400).send({ message });
            return;
        }

        const token = generateAuthToken(newUser);
        await newUser.save();
        const message = "User create successfully.";
        res.status(201).json({ message, token });

    } catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};


// Logout
module.exports.Logout = async (req, res) => {
    res.cookie('x-access-token', '', { httpOnly: true, maxAge: 1 });
    const message = "Logout successfully.";
    res.status(200).json({ message });
    return;
};