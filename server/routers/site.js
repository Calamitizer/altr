(function() {
    'use strict';

    var express = require('express');
    var path = require('path');

    var root = path.join(__dirname, '../../client/www');

    var siteRouter = express.Router();

    siteRouter.get('*', function(req, res) {
        res
            .status(200)
            .sendFile('/index.html', {
                root: root,
            });
    });

    module.exports = siteRouter;

}());
