const express = require('express');
const router = express.Router();
const protectedRoute = require('../middlewares/protectedRoute');
const upload = require("../config/multerConfig");
const {storeClient} = require("../controller/client.controller");
const {updateUserPermissions,getUsers, changeJobStatus, deleteJob, changeUserRole} = require("../controller/admin.controller");
const checkAuthorization = require("../middlewares/checkAuthorization");

router.get("/users",checkAuthorization('view_users'),protectedRoute,getUsers)
router.post('/users/create',checkAuthorization('create_users'),protectedRoute,upload.single('image'),storeClient)
router.put('/users/:id/permissions',checkAuthorization('edit_users'),protectedRoute,upload.none(),updateUserPermissions)
router.post('/users/:id/change-role',checkAuthorization('edit_users'),protectedRoute,upload.none(),changeUserRole)
router.put('/jobs/:id/change-status',checkAuthorization('edit_jobs'),protectedRoute,upload.none(),changeJobStatus)
router.delete('/jobs/:id/delete',checkAuthorization('delete_jobs'),protectedRoute,upload.none(),deleteJob)

module.exports = router