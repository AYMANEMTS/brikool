import React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import UpdateInformationForm from "../../components/settings/UpdateInformationForm";
import PasswordUpdateForm from "../../components/settings/PasswordUpdateForm";
import {useLoading} from "../../context/LoadingProvider";

function Settings() {
    const [index, setIndex] = React.useState(0);
    return (
        <AccordionGroup sx={{ width: 'full' }}>
            <Accordion
                expanded={index === 0}
                onChange={(event, expanded) => {
                    setIndex(expanded ? 0 : null);
                }}
            >
                <AccordionSummary>Update Your Information</AccordionSummary>
                <AccordionDetails>
                    <div className={"w-full mx-2"}>
                        <UpdateInformationForm/>
                    </div>

                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={index === 1}
                onChange={(event, expanded) => {
                    setIndex(expanded ? 1 : null);
                }}
            >
                <AccordionSummary>Change Password</AccordionSummary>
                <AccordionDetails>
                    <div className={"w-full mx-2"}>
                        <PasswordUpdateForm />
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={index === 2}
                onChange={(event, expanded) => {
                    setIndex(expanded ? 2 : null);
                }}
            >
                <AccordionSummary>Account Settings</AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                </AccordionDetails>
            </Accordion>
        </AccordionGroup>
    );
}

export default Settings;
