const {check} = require('express-validator');
const Category = require('../models/Category')

exports.createCategoryValidation = [
    check('name')
        .notEmpty().withMessage("Category is required")
        .custom(async (val) => {
            const existingCategory = await Category.findOne({ name: val });
            if (existingCategory) {
                return Promise.reject(new Error('Category already exists'));
            }
        })
        .isLength({min:5,max:30}).withMessage("Field must be between 5 and 30 characters long"),
    check('image').optional()
]