const express = require('express');
const router = express.Router();
const upload = require("../config/multerConfig");
const {getUserNotifications, markAsRead, clearAll, getUserUnreceivedNotifications, markAsReceived} = require('../controller/notification.controller')
const protectedRoute = require('../middlewares/protectedRoute')

router.get('/', upload.none(), protectedRoute, getUserNotifications)
router.get('/unreceived', upload.none(), protectedRoute, getUserUnreceivedNotifications)
router.post('/all-read', upload.none(), protectedRoute, markAsRead);
router.post('/all-received', upload.none(), protectedRoute, markAsReceived);
router.delete('/clear-all', upload.none(), protectedRoute, clearAll);


module.exports = router
