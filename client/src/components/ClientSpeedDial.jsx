import React from "react";
import {IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction} from "@material-tailwind/react";
import Trudiction from "./navbarParts/Trudiction";
import DarkMode from "./navbarParts/DarkMode";
import { Headset,Plus } from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function ClientSpeedDial() {
    const navigate = useNavigate();
    const scrollToFaq = () => {
        navigate("/");
        setTimeout(() => {
            const faqElement = document.getElementById("FAQ");
            if (faqElement) {
                faqElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

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
                        className="rounded-full bg-teal-blue hover:bg-teal-blue  shadow-none hover:text-white"
                    >
                        <Plus />
                    </IconButton>
                </SpeedDialHandler>
                {/* SpeedDial Actions */}
                <SpeedDialContent>
                    <SpeedDialAction className="bg-teal-blue shadow-none hover:shadow-none">
                        <Trudiction isSpeedDiaal={true} />
                    </SpeedDialAction>
                    <SpeedDialAction className="bg-teal-blue shadow-none hover:shadow-none">
                        <DarkMode isSpeedDiaal={true} />
                    </SpeedDialAction>
                    <SpeedDialAction className="bg-teal-blue text-white hover:text-white"
                                    onClick={scrollToFaq}>
                        <Headset />
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
}
