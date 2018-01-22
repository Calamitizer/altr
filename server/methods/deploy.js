(function() {
    'use strict';

    require('dotenv').config();

    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var compression = require('compression');
    var mongoose = require('mongoose');

    var path = require('path');
    var http = require('http');

    var apiRouter = require('../routers/api.v1.js');
    var assetRouter = require('../routers/asset.js');
    var siteRouter = require('../routers/site.js');

    var db = require('./db/index.js');

    var ALTR = express();

    ALTR
        .use(compression())
        .use(morgan('dev'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true,
        }))
        .use('/api/v1', apiRouter)
        .use('/', assetRouter)
        .use('/', siteRouter);

    var port = process.env.PORT || 1142;

    ALTR.set('port', port);
    var server = http.createServer(ALTR);
    ALTR.listen(ALTR.get('port'), function() {
        console.log('Express server listening on port ' + ALTR.get('port'));
    });

    db
        .connect()
        .once('open', function() {
            console.log('DB connected.');
        });

}());
