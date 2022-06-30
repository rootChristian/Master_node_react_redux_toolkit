const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema(
    {
        title: {
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
            required: true,
        },
        color_bg: {
            type: String,
        },
        image: {
            type: String,
            required: true,
            unique: true
        },
        cloudinary_id: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Carousel', CarouselSchema);
