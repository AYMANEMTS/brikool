const express = require('express');
const router = express.Router();
const upload = require("../multerConfig");
const {getUserNotifications,markAsRead, clearAll} = require('../controller/notification.controller')
const protectedRoute = require('../middlewares/protectedRoute')

router.get('/', upload.none(), protectedRoute, getUserNotifications)
router.post('/all-read', upload.none(), protectedRoute, markAsRead);
router.delete('/clear-all', upload.none(), protectedRoute, clearAll);


module.exports = router