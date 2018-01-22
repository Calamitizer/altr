(function() {
    'use strict';

    const BaseController = require('./base.ctrl.js');
    const User = require('../models/user.js');

    class UsersController extends BaseController {
        constructor() {
            super(User, 'username');
        }

        create(data) {
            return User.create(data);
        }

        read(username) {
            return User.findOne({
                username: username,
            });
        }

        update(username, data) {
            return User
                .findOne({
                    username: username,
                })
                .then(user => {
                    for (var prop in data) {
                        if (
                            data.hasOwnProperty(prop)
                            && user.hasOwnProperty(prop)
                            && prop !== 'username'
                            && prop !== '_id'
                        ) {
                            user[prop] = data[prop];
                        }
                    }

                    return user.save();
                });
        }

        delete(username) {
            return User
                .remove({
                    username: username,
                })
                .then(() => {});
        }

        list() {
            return User
                .find({});
        }

        addTag(username, tag) {
            return User
                .findOne({
                    username: username,
                })
                .then(user => {
                    user.tags.push(tag);
                    return user.save();
                });
        }
    }

    module.exports = new UsersController();

}());
