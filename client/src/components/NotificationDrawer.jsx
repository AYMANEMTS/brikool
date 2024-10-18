import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import formatDate from "../utils/formatDate";
import {Avatar} from "@mui/material";
import displayImage from "../utils/imageFromServer";
import {useQueryClient} from "react-query";
import ClientApi from "../api/ClientApi";
import {useNavigate} from "react-router-dom";

export default function NotificationDrawer({ open, toggleDrawer, notifications }) {
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if screen width is less than 600px (mobile)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const handleClearAll = async () => {
        try {
            await ClientApi.clearUserNotifications()
            await queryClient.invalidateQueries("notifications")
        }catch (e) {
            console.error(e)
        }
    }
    const notificationAction = async (notification) => {
        try {
            const notificationsIds = notification.notificationIds
            if (Array.isArray(notificationsIds) && notificationsIds.length > 0) {
                await ClientApi.markAsReadNotification(notificationsIds);
                await queryClient.invalidateQueries("notifications")
            } else {
                console.warn("No valid notification IDs provided.");
            }
            toggleDrawer()
            navigate(`/worker/${notification.relatedEntityId}`)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <Box>
            <Drawer
                anchor={isMobile ? 'bottom' : 'right'} // Drawer comes from the bottom for mobile, right for desktop
                open={open}
                onClose={() => toggleDrawer()}
                sx={{
                    width: isMobile ? '100%' : 300, // Full width on mobile, fixed width on desktop
                    maxHeight: isMobile ? '50%' : '100%', // Adjust height for mobile
                }}
            >
                <Box
                    role="presentation"
                    sx={{
                        padding: '16px',
                        overflowY: 'auto',
                        height: isMobile ? '100%' : 'auto', // Full height on mobile
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography level="h6" sx={{ mb: 2 }}>
                            Notifications
                        </Typography>
                        {notifications.length > 0 && (
                            <Button
                                variant="text"
                                color="error"
                                size="small"
                                onClick={handleClearAll}
                                sx={{
                                    textTransform: 'none', // Ensure text isn't uppercased
                                }}
                            >
                                Clear All
                            </Button>
                        )}
                    </Box>

                    <List>
                        {notifications.length === 0 ? (
                            <Typography sx={{ p: 2, textAlign: 'center' }}>No new notifications</Typography>
                        ) : (
                            notifications.map((notification, index) => (
                                <React.Fragment key={index} >
                                    <ListItem className={"m-2"} onClick={() => notificationAction(notification)} >
                                        <ListItemButton
                                            sx={{
                                                // Different background color for unread notifications
                                                backgroundColor: notification.read ? 'white' : 'rgba(0, 0, 255, 0.1)', // Light blue for unread
                                                '&:hover': {
                                                    backgroundColor: notification.read ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 255, 0.15)', // Hover effect
                                                },
                                                borderRadius: 5
                                            }}
                                        >
                                            <Avatar
                                                src={displayImage("",notification.senderId)}
                                                alt="User Image"
                                                sx={{ width: 40, height: 40, mr: 2 }}
                                            />

                                            <Box>
                                                <Typography
                                                    level="body1"
                                                    sx={{
                                                        fontWeight: notification.read ? 'normal' : 'bold', // Bold text for unread
                                                    }}
                                                >
                                                    New {notification.type}
                                                    {notification.count > 1 && (
                                                        <Typography
                                                            component="span"
                                                            sx={{ ml: 1, fontSize: '0.85rem', color: 'gray' }}
                                                        >
                                                            ({notification.count})
                                                        </Typography>
                                                    )}
                                                </Typography>

                                                <Typography level="body2" sx={{ color: 'text.secondary' }}>
                                                    {notification.content}
                                                </Typography>

                                                <Typography sx={{ fontSize: '0.75rem', color: 'gray' }}>
                                                    {formatDate(notification.createdAt)} {/* Format date */}
                                                </Typography>
                                            </Box>
                                        </ListItemButton>
                                    </ListItem>
                                    {index !== notifications.length - 1 && <Divider />}
                                </React.Fragment>


                            ))
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
