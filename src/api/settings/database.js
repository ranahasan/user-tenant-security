'use strict';

var Mongoose = require('mongoose');
var Config = require('../config/env/all');
var Acl = require('acl');
var acl = undefined;
//load database
Mongoose.connect('mongodb://localhost/'+ Config.mongo.database);
//Mongoose.connect('mongodb://' + Config.mongo.username + ':' + Config.mongo.password + '@' + Config.mongo.url + '/' + Config.mongo.database);
var dbInstance = Mongoose.connection;

dbInstance.on('error', console.error.bind(console, 'connection error'));
dbInstance.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

dbInstance.on('connected', function() {
    acl = new Acl(new Acl.mongodbBackend(dbInstance.db));
});

module.exports = {
    Mongoose: Mongoose,
    dbInstance: dbInstance,
    acl: acl
};