const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            unique: true
        },
        image: {
            type: String,
            required: true,
        },
        cloudinary_id: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Category', CategorySchema);