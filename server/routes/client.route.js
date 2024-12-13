const express = require('express');
const {updateClient, destroyClient, getUserJobs} = require("../controller/client.controller");
const router = express.Router();
const upload = require('../config/multerConfig');
const protectedRoute = require('../middlewares/protectedRoute');

// router.post('/', storeClient)


// router.get("/:id",showClient)

router.put("/",upload.single('image') ,protectedRoute,updateClient)

router.delete("/:id",upload.single('image') ,protectedRoute, destroyClient)
router.get('/jobs',protectedRoute,getUserJobs)

module.exports = router;
