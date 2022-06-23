/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: { 
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        size: { 
            type: Array
        },
        color: { 
            type: Array
        },
        inStock: { 
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", ProductSchema);