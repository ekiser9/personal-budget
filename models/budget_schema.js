const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        minlength: 6,
        required: true
    }
}, {collection: 'budget'});

module.exports = mongoose.model('budget', budgetSchema);