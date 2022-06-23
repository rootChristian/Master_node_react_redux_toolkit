/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const Cart = require('../models/CartModel');
const { isValidObjectId } = require('mongoose');

//Get carts on the database
module.exports.getCarts = async (req, res) => {
    try{
        const carts = await Cart.find();
        
        if(!carts) {
            res.status(500).json({message: 'Cart user not found!'})
        } 
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json({message: err})
    }
};

//Get cart on the database
module.exports.getCart = async (req, res) => {
    if(!isValidObjectId(req.params.userId))
        res.status(500).json({message: 'Invalid ID: ' + req.params.userId})
    try{
        const cart = await Cart.findOne({ idUser: req.params.userId });

        if(!cart)
            res.status(500).json({success: false, message: 'Cart not found!'})
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message: err})
    }
};
  
//Modify cart on the database
module.exports.modifyCart = async (req, res) => {
    if(!isValidObjectId(req.params.userId))
        res.status(500).json({message: 'Invalid ID: ' + req.params.userId})
    try{
        const cart = await Cart.findByIdAndUpdate(
            req.params.userId, 
            {
                $set : req.body 
            }, 
            { new: true }
        );
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message: err});
    }
};

//Delete cart on the database
module.exports.deleteCart = async (req, res) => {
    if(!isValidObjectId(req.params.userId))
        res.status(500).json({message: 'Invalid ID: ' + req.params.userId})

    Cart.findByIdAndDelete(req.params.userId).then(cart =>{
        if(cart) {
            return res.status(200).json({success: true, message: 'The cart is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "Cart not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
};
