import React, {useState} from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton} from "@mui/material";
import NotificationDrawer from "../NotificationDrawer";
import {useQuery} from "react-query";
import ClientApi from "../../api/ClientApi";

function Notification() {
    const { data: notifications = [] } = useQuery("notifications", ClientApi.getUserNotifications, {
        select: (data) => data.data,
        // refetchInterval: 1500,
        retry: 0,

    });
    const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
    const toggleDrawer = ()  => setOpenNotificationDrawer(!openNotificationDrawer)
    return (
        <>
            {notifications.length > 0 ? (
                <>
                    <IconButton
                        onClick={() => toggleDrawer()}
                        aria-label="notifications"
                        size="small"
                        sx={{
                            backgroundColor: 'gray', // Initial background color
                            color: 'white', // Icon color
                            padding: '5px', // Adjust padding for better spacing
                            borderRadius: '50%', // Round shape for the button
                            transition: 'all 0.3s ease', // Smooth transitions
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                            '&:hover': {
                                backgroundColor: 'darkgray', // Change background on hover
                                transform: 'scale(1.1)', // Slight zoom effect
                                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)', // More pronounced shadow on hover
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '1.8rem', // Adjust icon size
                            },
                        }}
                    >
                        <Badge
                            badgeContent={notifications.length}  // Pass the notification count here
                            color="error"  // Customize the badge color
                            max={99}       // Optional: limit the max number to display (e.g., "99+")
                            overlap="circular"  // To position the badge on top of a circular element
                        >
                            <NotificationsIcon fontSize="inherit" />
                        </Badge>
                    </IconButton>
                    <NotificationDrawer open={openNotificationDrawer} toggleDrawer={toggleDrawer} notifications={notifications} />
                </>
            ):null}


        </>
    );
}

export default Notification;