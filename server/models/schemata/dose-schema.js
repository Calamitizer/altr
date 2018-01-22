(function() {
    'use strict';

    const mongoose = require('mongoose');

    const SubstanceSchema = require('./substance-schema.js');
    const QuantitySchema = require('./quantity-schema.js');

    const DoseSchema = new mongoose.Schema({
        substance: {
            type: SubstanceSchema,
        },
        quantity: {
            type: QuantitySchema,
        },
        ROA: {
            type: String,
        },
        time: {
            type: Date,
        },
    });

    module.exports = DoseSchema;

}());
