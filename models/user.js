const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {type: String, unique: true, required: true},
    referredUser: {type: String, default:null},
    isPaymentMade: {type: Boolean, default: false},
    totalEarnings: {type: Number, default: 0},
});

const user = mongoose.model("User", userSchema);

module.exports = user;