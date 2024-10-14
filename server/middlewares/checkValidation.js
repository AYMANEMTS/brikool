// middlewares/checkValidation.js
const { validationResult } = require('express-validator');

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.status = 422;
        error.errors = errors.array();
        return next(error);
    }
    next();
};

module.exports = checkValidation;
