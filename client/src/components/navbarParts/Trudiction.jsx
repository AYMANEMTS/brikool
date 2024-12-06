import React, {useState} from 'react';
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ar from "../../flags-emoji/ma.png";
import fr from "../../flags-emoji/fr.png";
import en from "../../flags-emoji/us.png";
import {useTranslation} from "react-i18next";

function Trudiction() {
    const {t,i18n} = useTranslation();
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
            <Dropdown>
                <MenuButton
                    sx={{
                        borderRadius: 59,
                        padding: 1.2,
                        backgroundColor: "darkgray",
                        "&:hover": {
                            backgroundColor: "gray",
                        },
                    }}>
                    <img src={getFlagSrc(selectedLanguage)} alt={"mo"} className={"w-5 h-5"}/>
                </MenuButton>

                <Menu>
                    <MenuItem selected={selectedLanguage === "ar"} onClick={() => changeLanguage("ar")}>
                        <img src={ar} alt={"ar"} className={"w-5 h-5"}/> العربية
                    </MenuItem>
                    <MenuItem selected={selectedLanguage === "fr"} onClick={() => changeLanguage("fr")}>
                        <img src={fr} alt={"fr"} className={"w-5 h-5"}/>Français
                    </MenuItem>
                    <MenuItem selected={selectedLanguage === "en"} onClick={() => changeLanguage("en")}>
                        <img src={en} alt={"us"} className={"w-5 h-5"}/>English
                    </MenuItem>
                </Menu>
            </Dropdown>
        </>
    );
}

export default Trudiction;