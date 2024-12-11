import React, {useState} from 'react';
import {Phone,MessageCircleMore } from 'lucide-react';
import ClientApi from "../../../api/ClientApi";
import {useNavigate} from "react-router-dom";
import AuthModal from "../../auth/AuthModal";
import {useLoading} from "../../../context/LoadingProvider";

import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, IconButton} from "@material-tailwind/react";

function PhoneModal({ open, handleModal, phone }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(phone);
        handleModal();
    };

    return (
        <Dialog open={open} handler={handleModal} size="sm" className="rounded-lg">
            <DialogHeader>Phone Number</DialogHeader>
            <DialogBody divider className="text-gray-800 dark:text-gray-200">
                {phone}
            </DialogBody>
            <DialogFooter className="flex space-x-2">
                <Button onClick={copyToClipboard} color="blue" ripple="light">
                    Copy
                </Button>
                <Button onClick={handleModal} color="red" ripple="light">
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
function Contact({job}) {
    let whatssapLink = ""
    if (job?.contacts?.whatssap !== ""){
        const whatssapNumber = job?.contacts?.whatssap?.replace(/^0/,"") || ""
        whatssapLink = `https://wa.me/${whatssapNumber}`
    }
    const [phoneModal, setPhoneModal] = useState(false)
    const handleModal = () => setPhoneModal(!phoneModal)
    const navigate = useNavigate()
    const {user} = useLoading()
    const [loginForm, setLoginForm] = useState(false)

    const chatAction = async () => {
        try {
            if (!user){
                return setLoginForm(true)
            }
            if (job.userId._id === user._id){
                return window.alert("You can't chatting with your self 😅 ")
            }
            const userId2 = job.userId._id
            const res = await ClientApi.getChat(userId2)
            if (res.status === 200){
                navigate("/chat",{state:{chat:res.data}})
            }

        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="flex space-x-2">
                <IconButton variant={"outlined"} onClick={chatAction} className={"rounded-full"}>
                    <MessageCircleMore sx={{color: "#ffffff"}}/>
                </IconButton>

                {/* phone */}
                {job?.contacts?.appel !== "" && (
                    <IconButton variant={"outlined"} onClick={handleModal} className={"rounded-full"}>
                        <Phone />
                    </IconButton>
                )}

                {/* WhatsApp */}
                {job?.contacts?.whatssap !== "" && (
                    <IconButton variant={"outlined"} onClick={() => window.open(whatssapLink, "_blank")} className={"rounded-full"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={"h-6 w-6"}>
                            <path fill={"#2ca60b"}
                                d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                        </svg>
                    </IconButton>
                )}

                {/* linkedin */}
                {job?.contacts?.linkedin !== "" && (
                    <IconButton variant={"outlined"} onClick={() => window.open(job.contacts.linkedin, "_blank")} className={"rounded-full"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={"h-6 w-6"}>
                            <path fill={"#0015ff"}
                                d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                        </svg>
                    </IconButton>
                )}
            </div>
            <PhoneModal phone={job?.contacts?.appel} open={phoneModal} handleModal={handleModal}/>
            <AuthModal open={loginForm} handleOpen={() => setLoginForm(!loginForm)} redirectRoute={"/worker/" + job._id}
                       swapState={false}/>
        </>
    );
}

export default Contact;
