import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Trudiction from "./navbarParts/Trudiction";
import DarkMode from "./navbarParts/DarkMode";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const actions = [
    { icon: <Trudiction  />, name: 'Translate' },
    { icon: <DarkMode />, name: 'Theme' },
    { icon: <SupportAgentIcon />, name: 'Support' },
];

export default function ClientSpeedDial() {
    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}> {/* Ensure fixed positioning */}
            <SpeedDial
                ariaLabel="SpeedDial fixed example"
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
