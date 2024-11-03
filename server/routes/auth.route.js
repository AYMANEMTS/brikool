const express = require('express');
const router = express.Router();
const {registerClient,loginClient, logout,authenticateToken,changePassword} = require('../controller/auth.controller');
const {createClientValidation,loginValidation} = require("../validators/userValidation");
const checkValidation = require("../middlewares/checkValidation");
const protectedRoute = require("../middlewares/protectedRoute");
const upload = require('../config/multerConfig');


router.get("/check-auth",authenticateToken)
router.post('/register',upload.none(), createClientValidation,checkValidation,registerClient);
router.post('/login', upload.none(),loginValidation,checkValidation,loginClient);
router.post('/logout',protectedRoute,logout)
router.post('/changePassword',upload.none(),protectedRoute,changePassword)

module.exports = router;
