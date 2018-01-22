(function() {
    'use strict';

    const mongoose = require('mongoose');

    const SubstanceSchema = require('./substance-schema.js');
    const DoseSchema = require('./dose-schema.js');

    const UserSchema = new mongoose.Schema({
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        substances: {
            type: [SubstanceSchema],
            default: [],
        },
        units: {
            type: [String],
            default: [
                'mg',
            ],
        },
        rOAs: {
            type: [String],
            default: [
                'oral',
            ],
        },
        tags: {
            type: [String],
            default: [],
        },
        doses: {
            type: [DoseSchema],
            default: [],
        },
    });

    module.exports = UserSchema;

}());
