import React, {useState} from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChatIcon from '@mui/icons-material/Chat';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClientApi from "../../../api/ClientApi";
import {useNavigate} from "react-router-dom";
import AuthModal from "../../auth/AuthModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function PhoneModal({ open, handleModal, phone }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(phone);
        handleModal()
    };

    return (
        <Modal
            open={open}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Phone Number
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {phone}
                </Typography>
                <div className="flex space-x-2 mt-4">
                    <Button onClick={copyToClipboard} variant="contained" color="primary">
                        Copy
                    </Button>
                    <Button onClick={handleModal} variant="contained" color="secondary">
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
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
    const user = JSON.parse(localStorage.getItem('user'))
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
                <button onClick={chatAction}
                    className="bg-indigo-600 flex gap-2 items-center  text-gray-800 px-3 py-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <ChatIcon sx={{color: "#ffffff"}}/>
                </button>
                {/* phone */}
                {job?.contacts?.appel !== "" && (
                    <button onClick={handleModal}
                        className="bg-indigo-600 flex gap-2 items-center text-white px-3 py-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <PhoneEnabledIcon/>
                    </button>
                )}

                {/* WhatsApp */}
                {job?.contacts?.whatssap !== "" && (
                    <button onClick={() => window.open(whatssapLink, "_blank")}
                        className="bg-[#19eb3f] flex gap-2 items-center text-white px-3 py-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <WhatsAppIcon/>
                    </button>
                )}

                {/* linkedin */}
                {job?.contacts?.linkedin !== "" && (
                    <button  onClick={() => window.open(job.contacts.linkedin, "_blank")}
                        className="bg-indigo-600 flex gap-2 items-center  text-gray-800 px-3 py-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <LinkedInIcon sx={{color: "#ffffff"}}/>
                    </button>
                )}
            </div>
            <PhoneModal phone={job?.contacts?.appel} open={phoneModal} handleModal={handleModal} />
            <AuthModal open={loginForm} handleOpen={() => setLoginForm(!loginForm)} redirectRoute={"/worker/" + job._id}
                       swapState={false}/>
        </>
    );
}

export default Contact;