/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const User = require('../models/UserModel');
const Category = require('../models/CategoryModel');
const Product = require('../models/ProductModel');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

//registration user on the database
module.exports.signUp = async (req, res) => {
    try {
        // Uncomment this when you don't use firebase to save image
        /*let image;
        const file = req.file;

        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/users/`;
            image = `${basePath}${fileName}`;
        } else {
            image = "";
        }*/

        const { firstname, lastname, email, password, gender, image } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ message: "User already exist!", });

        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_PASSWORD
            ).toString(),
            gender: req.body.gender,
            image, // "http://localhost:3000/public/upload/users/image-123456"
        });

        if (!newUser) {
            const message = "the user cannot be created!";
            res.status(400).send({ message });
            return;
        }
        const message = "User create successfully.";
        res.status(201).json({ newUser, message });

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Check user on the database to login
module.exports.signIn = async (req, res) => {
    //expiresIn: "10h" // it will be expired after 10 hours
    //expiresIn: "20d" // it will be expired after 20 days
    //expiresIn: 120 // it will be expired after 120ms
    //expiresIn: "120s" // it will be expired after 120s
    //Duration token
    const maxAge = "1h"; //1 * 24 * 60 * 60 * 1000;

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            const message = "Wrong credentials!";
            res.status(401).send({ message });
            return;
        }

        const passwordHash = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_PASSWORD
        );
        const originPassword = passwordHash.toString(CryptoJS.enc.Utf8);

        if (originPassword !== req.body.password) {
            const message = "Incorrect Email or Password";
            res.status(401).send({ message });
            return;
        }

        //Create the token when user login
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.SECRET_TOKEN,
            { expiresIn: maxAge }
        );

        // Save cookie
        res.cookie('x-access-token', token, { httpOnly: true, expiresIn: maxAge });

        //Send the user without password
        const { password, ...data } = user._doc;
        const message = "Login successfully.";
        res.status(200).json({ ...data, message, token });

    } catch (err) {
        res.status(500).json({ message: err })
    }
};

//Delete categories and products on the database
module.exports.deleteProductsCategories = async (req, res) => {

    try {
        const cat = await Category.deleteMany();
        const prod = await Product.deleteMany();
        const user = await User.deleteMany();

        if (cat && prod && user) {
            return res.status(200).json({ success: true, message: 'Delete successfully!' })
        } else {
            return res.status(404).json({ success: false, message: "Delete unsuccessfully!" })
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err })
    }
};

// Logout
module.exports.Logout = async (req, res) => {
    res.cookie('x-access-token', '', { httpOnly: true, maxAge: 1 });
    //res.localStorage.removeItem('login');
    //res.redirect('/')
    const message = "Logout successfully.";
    res.status(200).json({ message });
    return;
};