const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plantURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    categories: {
        type: [String],
        required: true,
        Validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'At least one category is requried'
        }
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;