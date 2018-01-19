var validate = require('mongoose-validator');
var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1,50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters. Value: {VALUE}'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only. Value: {VALUE}'
    })
];

var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1,50],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters. Value: {VALUE}'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Username should contain alpha-numeric characters only. Value: {VALUE}'
    })
];

var emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [1,50],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters. Value: {VALUE}'
    }),
    validate({
        validator: 'isEmail',
        message: 'Incorrect Email Format. Value: {VALUE}'
    })
];

module.exports.nameValidator = nameValidator;
module.exports.emailValidator = emailValidator;
module.exports.usernameValidator = usernameValidator;