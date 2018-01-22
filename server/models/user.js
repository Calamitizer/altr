(function() {
    'use strict';

    const mongoose = require('mongoose');

    const UserSchema = require('./schemata/user-schema.js');

    module.exports = mongoose.model('User', UserSchema);

}());
