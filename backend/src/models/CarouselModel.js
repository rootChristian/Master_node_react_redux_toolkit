const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Carousel', CarouselSchema);
