import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChatIcon from '@mui/icons-material/Chat';

function Contact({job}) {
    return (
        <>
            <div className="flex space-x-2">
                <button
                    className="bg-indigo-600 flex gap-2 items-center  text-gray-800 px-3 py-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <ChatIcon sx={{color: "#ffffff"}}/>
                </button>
                {/* phone */}
                {job?.contacts?.appel !== "" && (
                    <button
                        className="bg-indigo-600 flex gap-2 items-center text-white px-3 py-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <PhoneEnabledIcon/>
                    </button>
                )}

                {/* WhatsApp */}
                {job?.contacts?.whatssap !== "" && (
                    <button
                        className="bg-[#19eb3f] flex gap-2 items-center text-white px-3 py-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <WhatsAppIcon/>
                    </button>
                )}

                {/* linkedin */}
                {job?.contacts?.linkedin !== "" && (
                    <button
                        className="bg-indigo-600 flex gap-2 items-center  text-gray-800 px-3 py-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <LinkedInIcon sx={{color: "#ffffff"}}/>
                    </button>
                )}
            </div>
        </>
    );
}

export default Contact;