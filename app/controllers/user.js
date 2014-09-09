'use strict';

var Boom = require('boom');
var Bcrypt = require('bcryptjs');
var salt = Bcrypt.genSaltSync(10);
var User = require('../models/user');

//Expose the CRUD functionality
module.exports = {
    getAll: function (request, reply) {
        User.find().sort('-created').exec(function (err, users) {
            if (err) {
                var error = Boom.badRequest(err);
                return reply(error);
            }
            return reply(users).type('application/json');
        });
    },
    create: function (request, reply) {
        var user = new User(request.payload);
        user.displayName = user.firstName + ' ' + user.lastName;
        user.created = new Date();

        // Save the user
        user.save(function (err, data) {
            if (err) {
                var error = Boom.badRequest(err);
                return reply(error);
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;
                return reply(data[0]).type('application/json');
            }
        });
    },
    get: function (request, reply) {
        User.findById(request.params.id).exec(function (err, user) {
            if (err) throw err;

            if (user === null) {
                var error = Boom.badRequest('No doc found in');
                return reply(error);
            }
            else {
                return reply(user).type('application/json');
            }
        });
    },
    update: function (request, reply) {
        var update = request.payload;
        User.findByIdAndUpdate(request.params.id, update).exec(function (err, user) {
            if (err) {
                var error = Boom.badRequest('No data found');
                return reply(error);
            }
            else {
                return reply({error: null, message: 'Updated successfully'});
            }
        });
    },
    delete: function (request, reply) {
        User.findByIdAndRemove(request.params.id).exec(function (err, user) {
            if (err) {
                return reply(Boom.badRequest(err));
            } else if (!user) {
                var error = Boom.notFound('No data found');
                return reply(error);
            }
            else {
                return reply({error: null, message: 'Deleted successfully'});
            }
        });
    }
};
