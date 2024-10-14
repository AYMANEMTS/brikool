const express = require('express');
const router = express.Router();
const {getAllCategory,storeCategory,destroyCategory,updateCategory,showCategory} = require('../controller/category.controller')
const checkValidation = require("../middlewares/checkValidation");
const protectedRoute = require("../middlewares/protectedRoute");
const { createCategoryValidation } = require('../validators/catrgoryValidation')

router.get('/',getAllCategory)
router.get('/:id',showCategory)
router.post('/',protectedRoute,createCategoryValidation,checkValidation,storeCategory)
router.put('/:id',protectedRoute,createCategoryValidation,checkValidation,updateCategory)
router.delete('/:id',protectedRoute,destroyCategory)

module.exports = router