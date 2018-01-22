(function() {
    'use strict';

    var express = require('express');
    var jwt = require('jsonwebtoken');

    var Users = require('../controllers/users.ctrl.js');

    var apiRouter = express.Router();

    var tokenValidator = function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, 'secret', function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Couldn\'t authenticate token.',
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res
                .status(403)
                .send({
                    success: false,
                    message: 'No token provided.',
                });
        }
    };

    apiRouter
        .use(function(req, res, next) {
            console.log('API request made');
            next();
        })
        .get('/setup', function(req, res) {
            console.log(Users);

            Users.create({
                username: 'test-user',
                password: 'hunter2',
                admin: false,
            })
            .then(newUser => res.json(newUser));

        })
        .get('/users', function(req, res) {
            Users
                .list()
                .then(users => res.json(users));
        });


    module.exports = apiRouter;

}());
