import React from 'react';
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import MApng from "../../flags-emoji/ma.png";
import FRpng from "../../flags-emoji/fr.png";
import USpng from "../../flags-emoji/us.png";

function Trudiction() {
    return (
        <>
            <Dropdown>
                <MenuButton
                    sx={{
                        borderRadius: 59,
                        padding: 1.2,
                        backgroundColor: "gray",
                        "&:hover": {
                            backgroundColor: "darkgray", // Change this to the color you want on hover
                        },
                    }}
                >
                    <img src={MApng} alt={"mo"} className={"w-5 h-5"}/>
                </MenuButton>

                <Menu>
                    <MenuItem selected={true}>
                        <img src={MApng} alt={"mo"} className={"w-5 h-5"}/>العربية
                    </MenuItem>
                    <MenuItem>
                        <img src={FRpng} alt={"fr"} className={"w-5 h-5"}/>Français
                    </MenuItem>
                    <MenuItem>
                        <img src={USpng} alt={"us"} className={"w-5 h-5"}/>English
                    </MenuItem>
                </Menu>
            </Dropdown>
        </>
    );
}

export default Trudiction;