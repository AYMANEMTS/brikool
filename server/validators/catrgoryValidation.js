const {check} = require('express-validator');
const Category = require('../models/Category')

exports.createCategoryValidation = [
    check('name')
        .notEmpty().withMessage("Category name is required")
        .custom(async (val, { req }) => {
            const existingCategory = await Category.findOne({ name: val });
            if (existingCategory && existingCategory._id.toString() !== req.params.id) {
                return Promise.reject(new Error('Category already exists'));
            }
        })
        .isLength({ min: 3, max: 30 }).withMessage("Field must be between 3 and 30 characters long"),
    check('image').optional()
]