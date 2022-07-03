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
            minlength: 3,
            maxlength: 20,
            unique: true
        },
        description: {
            type: String,
            minlength: 3,
            maxlength: 200,
            required: true
        },
        quantity: {
            type: Number,
            minlength: 1,
            maxlength: 1000,
            required: true
        },
        price: {
            type: Number,
            minlength: 1,
            maxlength: 1000,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        cloudinary_id: {
            type: String,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        size: {
            type: [String],
            default: []
            //type: Array
        },
        color: {
            type: [String],
            default: []
            //type: Array
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