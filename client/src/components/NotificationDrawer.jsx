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
import { useQuery } from "react-query";
import ClientApi from "../api/ClientApi";
import formatDate from "../utils/formatDate";

export default function NotificationDrawer({ open, toggleDrawer }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if screen width is less than 600px (mobile)

    // Fetch notifications
    const { data: notifications = [] } = useQuery(['notifications', user._id], () => ClientApi.getUserNotifications(user._id), {
        select: (data) => data.data
    });

    // Helper function to group notifications by type and senderId
    const groupNotifications = (notifications) => {
        const grouped = notifications.reduce((acc, notification) => {
            const key = `${notification.type}-${notification.senderId}`;
            if (!acc[key]) {
                acc[key] = { ...notification, count: 1 };
            } else {
                acc[key].count += 1;
            }
            return acc;
        }, {});

        return Object.values(grouped);
    };

    const groupedNotifications = groupNotifications(notifications);

    const handleClearAll = () => {
        // Clear all notifications logic here
    };

    return (
        <Box>
            <Drawer
                anchor={isMobile ? 'bottom' : 'right'} // Drawer comes from the bottom for mobile, right for desktop
                open={open}
                onClose={toggleDrawer(false)}
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
                        {groupedNotifications.length === 0 ? (
                            <Typography sx={{ p: 2, textAlign: 'center' }}>No new notifications</Typography>
                        ) : (
                            groupedNotifications.map((notification, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <ListItemButton>
                                            <Box>
                                                <Typography level="body1">
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
                                    {index !== groupedNotifications.length - 1 && <Divider />}
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
