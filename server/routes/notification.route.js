const express = require('express');
const router = express.Router();
const upload = require("../multerConfig");
const {getUserNotifications,markAsRead} = require('../controller/notification.controller')
const protectedRoute = require('../middlewares/protectedRoute')

router.get('/:userId', upload.none(), protectedRoute, getUserNotifications)
router.put('/:notificationId/read', upload.none(), protectedRoute, markAsRead);


module.exports = router