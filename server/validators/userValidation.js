const {check} = require('express-validator');
const User = require('../models/User');
exports.createClientValidation = [
    check('name')
        .notEmpty().withMessage('Name is required')
        .isLength({min:4}).withMessage('Minimum character is 4'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('incorrect email address')
        .custom((val) => User.findOne({ email: val })
            .then((user) => {
                if (user){
                    return Promise.reject(new Error('User already exists'));
                }
            })
        ),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min:7}).withMessage('Minimum character is 7'),

    check('city')
        .notEmpty().withMessage('City is required')
]

exports.loginValidation = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('incorrect email address'),
    check('password')
        .notEmpty().withMessage('Password is required')
]