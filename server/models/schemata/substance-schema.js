(function() {
    'use strict';

    const mongoose = require('mongoose');

    const SubstanceSchema = new mongoose.Schema({
        name: {
            type: String,
        },
        tags: {
            type: [String],
            default: [],
        },
    });

    module.exports = SubstanceSchema;

}());
