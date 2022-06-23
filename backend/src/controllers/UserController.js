/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const User = require('../models/UserModel')
const CryptoJS = require('crypto-js');
const { isValidObjectId } = require('mongoose');
const jwt = require("jsonwebtoken");

//Get users on the database
module.exports.getUsers = async (req, res) => {
    const query = req.query.new;
    try{
        const users = query 
            ? await User.find().select('-password').sort({_id:-1}).limit(5) 
            : await User.find().select('-password');
        //const users = await User.find().select('-password');
        
        if(!users) {
            res.status(500).json({success: false})
        } 
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err})
    }
};

//Get user on the database
module.exports.getUser = async (req, res) => {
    if(!isValidObjectId(req.params.id))
        res.status(500).json({message: 'Invalid ID: ' + req.params.id})
    try{
        const user = await User.findById(req.params.id).select('-password');

        if(!user)
            res.status(500).json({message: 'User not found!'})
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err})
    }
};
  
//Modify user on the database
module.exports.modifyUser = async (req, res) => {
    const idUser = req.params.id;

    if(!isValidObjectId(idUser)) res.status(500).json({message: 'Invalid ID: ' + idUser})

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_PASSWORD
        ).toString();
    }
    
    try{
        let imagepath;
        const file = req.file;
        
        if (file) {
            const fileName = file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/users/`;
            imagepath = `${basePath}${fileName}`;
        } else {
            const user = await User.findById(idUser);
            imagepath = user.image;
        }

        const updatedUser = await User.findByIdAndUpdate(
            idUser,
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                image: imagepath, // "http://localhost:8000/public/upload/users/image-123456"
            },
            { new: true }
        );

        if (!updatedUser) return res.status(500).send('The user cannot be updated!');
        
        res.status(200).json(updatedUser);
    /*if(!isValidObjectId(req.params.id))
        res.status(500).json({message: 'Invalid ID: ' + req.params.id})

    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_PASSWORD
        ).toString();
    }

    try{
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set : req.body 
            }, 
            { new: true }
        );
        res.status(200).json(user);*/
    }catch(err){
        res.status(500).json({message: err});
    }
};

//Delete user on the database
module.exports.deleteUser = async (req, res) => {
    if(!isValidObjectId(req.params.id))
        res.status(500).json({message: 'Invalid ID: ' + req.params.id})

    User.findByIdAndDelete(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
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
      res.status(500).json({message: err});
    }
};