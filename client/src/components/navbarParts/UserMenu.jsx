import {Menu, MenuHandler, MenuList, MenuItem, Button,} from "@material-tailwind/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ClientApi from "../../api/ClientApi";
import { enqueueSnackbar } from "notistack";
import { useLoading } from "../../context/LoadingProvider";
import {LogOut,SlidersHorizontal,Megaphone,MessageCircleMore,Headset,User } from "lucide-react";

export default function DemoUserMenu() {
    const { t } = useTranslation("navbar");
    const { startLoading, stopLoading, setIsAuthenticated, setUser, user } = useLoading();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            startLoading();
            await ClientApi.logout();
            setIsAuthenticated(false);
            setUser(null);
            navigate("/");
            enqueueSnackbar("Good Bye", { variant: "info" });
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            stopLoading();
        }
    };

    return (
        <Menu>
            <MenuHandler>
                <Button
                    size="sm"
                    variant="solid"
                    className="flex items-center p-1 text-white bg-teal-blue dark:bg-bright-yellow rounded-md shadow-sm hover:bg-teal-blue dark:hover:bg-bright-yellow"
                >
                    <User className={"w-6 h-6 md:text-xl dark:text-black "} />
                    <span className={"hidden lg:!flex lg:px-2 dark:text-black"}>{user?.name}</span>
                </Button>
            </MenuHandler>
            <MenuList className="bg-white dark:bg-gray-800 dark:text-white rounded-md shadow-lg">
                <MenuItem
                    onClick={() => navigate("/announces")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 p-2"
                >
                    <Megaphone className={"h-6 w-6"} />
                    {t("announces")}
                </MenuItem>

                <MenuItem
                    onClick={() => navigate("/chat")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 p-2"
                >
                    <MessageCircleMore className={"h-6 w-6"} />
                    {t("chat")}
                </MenuItem>

                <MenuItem
                    onClick={() => navigate("/settings")}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 p-2"
                >
                    <SlidersHorizontal className={"h-6 w-6"} />
                    {t("settings")}
                </MenuItem>

                <MenuItem
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 p-2"
                >
                    <Headset className={"w-6 h-6"} />
                    {t("support")}
                </MenuItem>

                <MenuItem
                    onClick={handleLogout}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 p-2"
                >
                    <LogOut className={"w-6 h-6"} />
                    {t("logout")}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
