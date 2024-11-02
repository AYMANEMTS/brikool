const express = require('express');
const {storeClient, getClients, showClient, updateClient, destroyClient} = require("../controller/client.controller");
const router = express.Router();
const upload = require('../multerConfig');
const protectedRoute = require('../middlewares/protectedRoute');

// router.post('/', storeClient)

// router.get("/",getClients)

// router.get("/:id",showClient)

router.put("/",upload.single('image') ,protectedRoute,updateClient)

// router.delete("/:id", destroyClient)


module.exports = router;