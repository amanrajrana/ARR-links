const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true
    },

    lastName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    profilePic: {
        type: String,
        default: 'default.webp'
    },

    isPolicyAccept: {
        type: Boolean,
        require: true
    },

    details: {
        phone: String,
        dob: Date,
        gender: String,
    }

},
    { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;