(function() {
    'use strict';

    const mongoose = require('mongoose');

    const config = require('./config.js');

    const connectOnce = function() {
        mongoose.connect(config.uri, config.options);
        return mongoose.connection
            .on('error', console.log);
    };

    module.exports = function() {
        return connectOnce()
            //.on('disconnected', connectOnce);
    };
}());
