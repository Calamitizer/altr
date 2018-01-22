(function() {
    'use strict';

    const mongoose = require('mongoose');

    const QuantitySchema = new mongoose.Schema({
        magnitude: {
            type: Number,
            default: 1,
        },
        unit: {
            type: String,
        },
    });

    module.exports = QuantitySchema;

}());
