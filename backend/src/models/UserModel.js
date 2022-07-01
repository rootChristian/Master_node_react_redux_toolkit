const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20
        },
        lastname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        },
        gender: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        cloudinary_id: {
            type: String,
        },
        role: {
            type: String,
            minlength: 4,
            maxlength: 5,
            enum: ['ROOT', 'ADMIN', 'USER'],
            default: 'USER'
        },
        /*isAdmin: {
            type: Boolean,
            default: false
        },*/
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
