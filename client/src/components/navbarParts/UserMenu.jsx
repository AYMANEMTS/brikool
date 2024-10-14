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

function UserMenu({user}) {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await ClientApi.logout();
            localStorage.clear();
            navigate("/")
            enqueueSnackbar('Good By ',{variant:"info"})
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <>
            <Dropdown>
                <MenuButton startDecorator={<PersonIcon />}
                            sx={{
                                borderRadius: 59,
                                padding: 1.2,
                                backgroundColor: "gray",
                                "&:hover": {
                                    backgroundColor: "darkgray", // Change this to the color you want on hover
                                },
                            }}
                >{user?.name}</MenuButton>

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