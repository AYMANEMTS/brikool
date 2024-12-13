    import React from "react";
import {Drawer, Typography, List, ListItem, Button} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { Megaphone } from "lucide-react";

export default function MobileDrawer({ open, toggleDrawer }) {
    const {t} = useTranslation('navbar')
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Drawer open={open} onClose={() => toggleDrawer()} overlay={false}>
                <div className="mb-2 flex items-center justify-between p-4">
                    <img src={"/logo_lg.png"} className={"h-auto w-auto"} alt={"logo"}/>
                </div>
                <div className={"mx-6 mb-3"}>
                    <Typography variant={"h4"}>{t('nav_mobile_title')}</Typography>
                    <Typography variant={"small"} className={"font-semibold"}>{t('nav_mobile_text')}</Typography>

                    <Button  variant={"outlined"} size={"sm"} color={"blue"}
                    onClick={() => {
                        toggleDrawer()
                        navigate("/announces?showForm=true")
                    }}
                    className="flex items-center space-x-2  mt-2 font-semibold "
                    >
                        <span>{t("createNewJob")}</span>
                        <Megaphone className="w-6 h-6 text-gray-700" />
                    </Button>
                </div>
                <List >
                    <ListItem>
                        <Link to="/" onClick={toggleDrawer}>
                            <Button >{t('home')}</Button>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/workers" onClick={toggleDrawer}>
                            <Button>{t('workers')}</Button>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/about-us" onClick={toggleDrawer}>
                            <Button>{t('about')}</Button>
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
}