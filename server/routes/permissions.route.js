const express = require('express');
const {togglePermission} = require("../controller/permission.controller");
const protectedRoute = require("../middlewares/protectedRoute");
const checkAuthorization = require("../middlewares/checkAuthorization");
const router = express.Router();


router.post('/',protectedRoute,checkAuthorization("edit_permissions"),togglePermission)

module.exports = router;
