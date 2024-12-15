import React from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import UpdateInformationForm from "../../components/settings/UpdateInformationForm";
import PasswordUpdateForm from "../../components/settings/PasswordUpdateForm";
import { useTranslation } from "react-i18next";
import {OTPForm} from "../../components/auth/OTPForm";

function Settings() {
    const [open, setOpen] = React.useState(1);
    const { t } = useTranslation("settings");

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const [otp, setOtp] = React.useState(Array(6).fill(""));

    return (
        <div className="w-full">
            {/*<OTPForm otp={otp} setOtp={setOtp} />*/}
            {/* First Accordion */}
            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className={"text-teal-blue hover:text-teal-blue"}>
                    {t("settings_title_1")}
                </AccordionHeader>
                <AccordionBody>
                    <div className="w-full mx-2">
                        <UpdateInformationForm />
                    </div>
                </AccordionBody>
            </Accordion>

            {/* Second Accordion */}
            <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)} className={"text-teal-blue hover:text-teal-blue"}>
                    {t("settings_title_2")}
                </AccordionHeader>
                <AccordionBody>
                    <div className="w-full mx-2">
                        <PasswordUpdateForm />
                    </div>
                </AccordionBody>
            </Accordion>
        </div>
    );
}

export default Settings;
