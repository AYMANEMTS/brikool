const express = require('express');
const router = express.Router();
const protectedRoute = require('../middlewares/protectedRoute');
const upload = require("../config/multerConfig");
const {storeClient} = require("../controller/client.controller");
const {updateUserPermissions,getUsers, changeJobStatus, deleteJob} = require("../controller/admin.controller");

router.get("/users",protectedRoute,getUsers)
router.post('/users/create',protectedRoute,upload.single('image'),storeClient)
router.put('/users/:id/permissions',protectedRoute,upload.none(),updateUserPermissions)
router.put('/jobs/:id/change-status',protectedRoute,upload.none(),changeJobStatus)
router.delete('/jobs/:id/delete',protectedRoute,upload.none(),deleteJob)

module.exports = router