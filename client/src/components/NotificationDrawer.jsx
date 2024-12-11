import React from "react";
import {Drawer, Button, Typography,Avatar, List, Badge,} from "@material-tailwind/react";
import formatDate from "../utils/formatDate";
import displayImage from "../utils/imageFromServer";
import { useQueryClient } from "react-query";
import ClientApi from "../api/ClientApi";
import { useNavigate } from "react-router-dom";

export default function NotificationDrawer({ open, toggleDrawer, notifications }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleClearAll = async () => {
        try {
            toggleDrawer();
            await ClientApi.clearUserNotifications();
            await queryClient.invalidateQueries("notifications");
        } catch (e) {
            console.error(e);
        }
    };

    const notificationAction = async (notification) => {
        try {
            const notificationsIds = notification.notificationIds;
            if (Array.isArray(notificationsIds) && notificationsIds?.length > 0) {
                await ClientApi.markAsReadNotification(notificationsIds);
                await queryClient.invalidateQueries("notifications");
            } else {
                console.warn("No valid notification IDs provided.");
            }
            toggleDrawer();
            navigate(`/worker/${notification.relatedEntityId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Drawer
            overlay={false} size={400} open={open}  onClose={() => toggleDrawer()}
            placement="right"
            className="p-2  bg-gray-50 dark:bg-gray-900 shadow-lg rounded-l-lg"
        >
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="text-gray-800 dark:text-gray-100 font-semibold">
                    Notifications
                </Typography>
                {notifications?.length > 0 && (
                    <Button
                        variant="gradient"
                        size="sm"
                        color="red"
                        onClick={handleClearAll}
                        className="capitalize bg-red-500 hover:bg-red-600 text-white dark:text-red-200 px-4 py-1 rounded"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            <List className="space-y-3">
                {notifications?.length === 0 ? (
                    <Typography
                        variant="body2"
                        className="text-center text-gray-500 dark:text-gray-400 p-4"
                    >
                        No new notifications
                    </Typography>
                ) : (
                    notifications?.map((notification, index) => (
                        <React.Fragment key={index} >
                            <div onClick={() => notificationAction(notification)}
                                className={`flex items-center gap-4 px-1 rounded-lg shadow-sm ${
                                    notification.read
                                        ? "bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                                        : "bg-blue-100 border border-blue-300 dark:bg-blue-800 dark:border-blue-600"
                                } hover:shadow-md transition-shadow duration-200 cursor-pointer`}>

                                {/* Avatar */}
                                <Avatar src={displayImage("", notification.senderId)} className="w-12 h-12" />

                                {/* Notification Content */}
                                <div className="flex-1">
                                    {/* Type and Badge */}
                                    <div className="flex justify-between items-center mb-1">
                                        <span
                                            className={`text-lg font-semibold capitalize ${
                                                notification.read
                                                    ? "text-gray-800 dark:text-gray-300"
                                                    : "text-blue-800 dark:text-blue-300"
                                            }`}
                                        >
                                            {notification.type}
                                        </span>
                                        {notification.count > 1 && (
                                            <Badge
                                                placement="top-end"
                                                content={notification.count}
                                                className="bg-red-500 text-white"
                                            />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <span
                                        className={`block text-sm ${
                                            notification.read
                                                ? "text-gray-600 dark:text-gray-400"
                                                : "text-blue-600 dark:text-blue-300"
                                        }`}
                                    >
                                        {notification.content}
                                    </span>

                                    {/* Created At */}
                                    <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {formatDate(notification.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>

                    ))
                )}
            </List>
        </Drawer>

    );
}
