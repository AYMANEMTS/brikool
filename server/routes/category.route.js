const express = require('express');
const router = express.Router();
const {getAllCategory,storeCategory,destroyCategory,updateCategory,showCategory} = require('../controller/category.controller')
const checkValidation = require("../middlewares/checkValidation");
const protectedRoute = require("../middlewares/protectedRoute");
const { createCategoryValidation } = require('../validators/catrgoryValidation')
const upload = require('../config/multerConfig');
const checkAuthorization = require("../middlewares/checkAuthorization");

router.get('/',getAllCategory)
router.get('/:id',showCategory)
router.post('/',protectedRoute,checkAuthorization('create_category'),upload.single('image'),createCategoryValidation,checkValidation,storeCategory)
router.put('/:id',protectedRoute,checkAuthorization('edit_category'),upload.single('image'),createCategoryValidation,checkValidation,updateCategory)
router.delete('/:id',checkAuthorization('delete_category'),protectedRoute,destroyCategory)

module.exports = router