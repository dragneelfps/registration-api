var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var validators = require('./validators/client');


var clientModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: validators.nameValidator
    },
    username: {
        type: String,
        required: true,
        unique: true,
        validate: validators.usernameValidator

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validators.emailValidator
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    id_code: {
        type: String
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin'
    },
    linked: {
        type: Boolean,
        default: false
    }
});

clientModel.plugin(uniqueValidator);


Client = mongoose.model('Client', clientModel);
module.exports = Client;



// Client.schema.path('name').validate(
// }, 'This name is already registered');