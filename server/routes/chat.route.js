const express = require('express');
const { getChat, sendMessage, getUserChats } = require('../controller/chat.controller');
const router = express.Router();
const upload = require('../config/multerConfig');
const protectedRoute = require("../middlewares/protectedRoute");

router.get('/chats-user', upload.none(), protectedRoute, getUserChats); // Get all chats for a user
router.post('/:chatId/messages', upload.none(), protectedRoute, sendMessage); // Send message
router.get('/:userId2',upload.none(),protectedRoute, getChat); // Get chat between two users

module.exports = router;
