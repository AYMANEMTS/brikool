import React from "react";
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from "@material-tailwind/react";

import Trudiction from "./navbarParts/Trudiction";
import DarkMode from "./navbarParts/DarkMode";
import { Headset,Plus } from 'lucide-react';

export default function ClientSpeedDial() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* SpeedDial Component */}
            <SpeedDial>
                {/* Trigger Button */}
                <SpeedDialHandler>
                    <IconButton
                        variant="filled"
                        color="blue"
                        size="lg"
                        className="rounded-full shadow-lg"
                    >
                        <Plus />
                    </IconButton>
                </SpeedDialHandler>
                {/* SpeedDial Actions */}
                <SpeedDialContent>
                    <SpeedDialAction className="bg-white shadow">
                        <Trudiction />
                    </SpeedDialAction>
                    <SpeedDialAction className="bg-white shadow">
                        <DarkMode />
                    </SpeedDialAction>
                    <SpeedDialAction className="bg-white shadow">
                        <Headset />
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
}
