import React from 'react';
import MenuButton from "@mui/joy/MenuButton";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import CampaignIcon from "@mui/icons-material/Campaign";
import ChatIcon from "@mui/icons-material/Chat";
import TuneIcon from "@mui/icons-material/Tune";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LogoutIcon from "@mui/icons-material/Logout";
import Dropdown from "@mui/joy/Dropdown";
import {useNavigate} from "react-router-dom";
import ClientApi from "../../api/ClientApi";
import {enqueueSnackbar} from "notistack";
import {useLoading} from "../../context/LoadingProvider";

function UserMenu() {
    const navigate = useNavigate()
    const {startLoading,stopLoading,setIsAuthenticated,user,setUser} = useLoading()
    const handleLogout = async () => {
        try {
            startLoading()
            await ClientApi.logout();
            setIsAuthenticated(false)
            setUser(null)
            navigate("/")
            enqueueSnackbar('Good By ',{variant:"info"})
        } catch (error) {
            console.error("Logout failed:", error);
            stopLoading()
        }
    };
    return (
        <>
            <Dropdown>
                <MenuButton size={"sm"}
                    startDecorator={<PersonIcon />}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.6rem 1rem', // Better padding for a clickable feel
                        backgroundColor: 'gray',
                        color: 'white',
                        borderRadius: '12px', // More subtle rounded corners
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                        transition: 'all 0.3s ease-in-out', // Smooth transitions
                        '&:hover': {
                            backgroundColor: 'darkgray',
                            transform: 'scale(1.05)', // Slight zoom-in on hover
                        },
                        '& .MuiSvgIcon-root': {
                            marginRight: '0.5rem', // Space between icon and text
                        },
                    }}
                >
                    {user?.name}
                </MenuButton>


                <Menu>
                    <MenuItem onClick={() => navigate("/announces")}>
                        <CampaignIcon fontSize={"medium"} />Announces
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/chat")}>
                        <ChatIcon fontSize={"medium"} />Chat
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/settings")} >
                        <TuneIcon fontSize={"medium"} />Settings
                    </MenuItem>
                    <MenuItem>
                        <SupportAgentIcon fontSize={"medium"} />Support
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <LogoutIcon fontSize={"medium"} />Logout
                    </MenuItem>
                </Menu>
            </Dropdown>
        </>
    );
}

export default UserMenu;
