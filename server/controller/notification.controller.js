const Notification = require('../models/Notification')
const getUserFromToken = require('../utils/getUserIdFromToken');

const getUserNotifications = async (req, res) => {
    try {
        const token = req.cookies.jwt
        const user = await getUserFromToken(token)
        const notifications = await Notification.find({ userId:user._id }).sort({ createdAt: -1 }).populate("senderId")
        const groupedNotifications = notifications.reduce((acc, notification) => {
            const key = `${notification.type}-${notification.senderId._id}-${notification.relatedEntityId}-${notification.read}`;
            if (!acc[key]) {
                acc[key] = {
                    ...notification.toObject(), // Convert Mongoose doc to plain object
                    count: 1,
                    notificationIds: [notification._id] // Initialize array for notification IDs
                };
            } else {
                acc[key].count += 1; // Increment the counter for this group
                acc[key].notificationIds.push(notification._id); // Add current notification ID
            }

            return acc;
        }, {});

        // Convert grouped notifications object into an array
        const groupedNotificationsArray = Object.values(groupedNotifications);
        res.status(200).json(groupedNotificationsArray);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

// Mark notifications as read
const markAsRead = async (req, res) => {
    try {
        const { notificationsIds } = req.body;
        if (!Array.isArray(notificationsIds) || notificationsIds.length === 0) {
            return res.status(400).json({ message: 'notificationIds is empty or invalid' });
        }
        await Notification.updateMany(
            { _id: { $in: notificationsIds } },
            { read: true }
        );
        return res.status(200).json({
            message: "Notifications updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error marking notifications as read' });
    }
};


const clearAll = async (req,res) => {
    try {
        const token = req.cookies.jwt
        const user = await getUserFromToken(token)
        await Notification.deleteMany({ userId: user._id });
        res.status(200).json({ message: 'All notifications cleared successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error delete notifications' });
    }
}

module.exports = {
    getUserNotifications,
    markAsRead,
    clearAll
};

