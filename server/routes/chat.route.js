const express = require('express');
const { getChat, sendMessage, getUserChats } = require('../controller/chat.controller');
const router = express.Router();
const upload = require('../multerConfig');
const protectedRoute = require("../middlewares/protectedRoute");

router.post('/:chatId/messages', upload.none(), protectedRoute, sendMessage); // Send message
router.get('/:userId1/:userId2',upload.none(),protectedRoute, getChat); // Get chat between two users
router.get('/user/:userId/pp', upload.none(), protectedRoute, getUserChats); // Get all chats for a user

module.exports = router;