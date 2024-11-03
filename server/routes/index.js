const express = require('express');
const clientsRoutes = require('./client.route');
const authRoutes = require('./auth.route');
const googleAuthRoutes = require('./google-auth.route');
const categoryRoutes = require('./category.route');
const jobRoutes = require('./job.route');
const chatRoutes = require('./chat.route');
const notificationRoutes = require('./notification.route');

const router = express.Router();

router.use("/clients", clientsRoutes);
router.use("/", authRoutes);
router.use("/", googleAuthRoutes);
router.use("/categories", categoryRoutes);
router.use("/jobs", jobRoutes);
router.use("/chats", chatRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;
