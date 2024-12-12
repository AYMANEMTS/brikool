import React, {useState} from 'react';
import {Menu, MenuHandler, MenuList, MenuItem, IconButton} from "@material-tailwind/react";
import ar from "../../flags-emoji/ma.png";
import fr from "../../flags-emoji/fr.png";
import en from "../../flags-emoji/us.png";
import {useTranslation} from "react-i18next";

function Trudiction() {
    const {i18n} = useTranslation();
    const {language} = i18n
    const [selectedLanguage, setSelectedLanguage] = useState(language || "en")
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setSelectedLanguage(lang);
    };
    const getFlagSrc = (lang) => {
        switch (lang) {
            case "fr":
                return fr;
            case "ar":
                return ar;
            case "en":
            default:
                return en;
        }
    };
    return (
        <>
            <Menu>
                <MenuHandler>
                    <IconButton variant={"outlined"} size={"sm"} className={"p-1"}>
                        <img src={getFlagSrc(selectedLanguage)} alt={"mo"} className={"w-5 h-5"}/>
                    </IconButton>
                </MenuHandler>
                <MenuList>
                    <MenuItem className={"flex items-center gap-2"}
                        selected={selectedLanguage === "ar"} onClick={() => changeLanguage("ar")}>
                        <img src={ar} alt={"ar"} className={"w-5 h-5"}/> العربية
                    </MenuItem>
                    <MenuItem className={"flex items-center gap-2"}
                        selected={selectedLanguage === "fr"} onClick={() => changeLanguage("fr")}>
                        <img src={fr} alt={"fr"} className={"w-5 h-5"}/>Français
                    </MenuItem>
                    <MenuItem className={"flex items-center gap-2"}
                        selected={selectedLanguage === "en"} onClick={() => changeLanguage("en")}>
                        <img src={en} alt={"us"} className={"w-5 h-5"}/>English
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
}

export default Trudiction;