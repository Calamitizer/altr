(function() {
    'use strict';

    const path = require('path');
    
    const uri = process.env.MONGODB_URI;

    const options = {};

    module.exports = {
        uri,
        options,
    };
}());
