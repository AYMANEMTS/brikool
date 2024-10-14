import React, { useState } from 'react';
import ChatList from "../../components/chat/ChatList";
import ChatWindow from "../../components/chat/ChatWindow";



function Chat() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [isChatListVisible, setIsChatListVisible] = useState(true);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        // On small screens, hide ChatList when a chat is selected
        if (window.innerWidth < 768) {
            setIsChatListVisible(false);
        }
    };

    const handleBackToList = () => {
        setIsChatListVisible(true);
    };

    return (
        <div className="flex flex-col h-screen md:pt-20 pb-5 mx-0 px-0 pt-40">
            <div className="flex flex-col md:flex-row h-full">
                {/* ChatList */}
                <div
                    className={`${
                        isChatListVisible ? 'block' : 'hidden'
                    } md:block md:w-1/3 lg:w-1/4 border-r border-gray-300 h-full overflow-y-auto`}
                >
                    <ChatList onSelectChat={handleSelectChat} />
                </div>

                {/* ChatWindow */}
                <div className="flex-1 flex flex-col h-full">
                    {selectedChat ? (
                        <>
                            <div className="flex-1 overflow-y-auto">
                                <ChatWindow
                                    chat={selectedChat}
                                    onBack={handleBackToList}
                                />
                            </div>

                            {/* Input Section Fixed at the Bottom */}
                            {/*<div className="p-4 shadow-lg flex bg-white">*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        placeholder="Type a message..."*/}
                            {/*        className="flex-1 border border-gray-300 rounded-md p-2 mr-2"*/}
                            {/*    />*/}
                            {/*    <button className="bg-blue-500 text-white p-2 rounded-md">*/}
                            {/*        Send*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select a chat to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;

