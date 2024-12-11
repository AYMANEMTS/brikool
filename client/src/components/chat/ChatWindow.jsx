import React, { useEffect, useState, useRef } from 'react';
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import io from 'socket.io-client';
import formatDate from "../../utils/formatDate"; // Your utility for formatting dates
import {Input,Avatar,Button} from "@material-tailwind/react"
import {CornerUpLeft} from 'lucide-react'
const socket = io('http://localhost:8000'); // Replace with your server's URL


function ChatWindow({ chat, onBack, user, otherParticipant }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // Create a ref for the messages container

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const userId2 = otherParticipant(chat)._id
                const res = await ClientApi.getChat(userId2); // Fetch messages for this chat
                setMessages(res.data.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (chat) {
            fetchMessages();
            socket.emit('joinRoom', chat._id); // Join the chat room for real-time updates
        }

        // Clean up when the component unmounts
        return () => {
            socket.emit('leaveRoom', chat._id); // Leave the room when the chat changes or unmounts
        };
    }, [chat]);

    useEffect(() => {
        // Listen for new messages from the server
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up socket event listeners on unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Scroll to the bottom of the messages container whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Don't send empty messages

        try {
            const chatId = chat._id;
            const recipientId = otherParticipant(chat)._id
            const res = await ClientApi.sendMessage(chatId, {
                senderId: user._id,
                content: newMessage,
                recipientId: recipientId
            });
            const sentMessage = res.data.messages[res.data.messages.length - 1];
            // Emit the new message to the server to broadcast to other users
            socket.emit('sendMessage', { chatId, message: sentMessage });

            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-white shadow-md">
                <div className="flex items-center p-4">
                    {/* Back Button for small screens */}
                    <button
                        onClick={onBack}
                        className="md:hidden text-gray-500"
                    >
                        <CornerUpLeft />
                    </button>
                    <Avatar
                        src={displayImage("", otherParticipant(chat))}
                        alt={otherParticipant(chat)?.name}
                        className="mr-2"
                    />
                    <p className="text-lg font-semibold">{otherParticipant(chat)?.name}</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto" style={{maxHeight: 'calc(100vh - 64px - 56px)'}}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${message.sender === user?._id ? 'items-end' : 'items-start'} mb-2`}
                    >
                        <div
                            className={`max-w-xs p-2 m-1 rounded-lg shadow ${message.sender === user?._id ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        >
                            <p className="text-sm">{message.content}</p>
                        </div>
                        {/* Timestamp */}
                        <p className="text-xs text-gray-500 px-2">
                            {formatDate(message?.timestamp)}
                        </p>
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-300">
                <form className="flex" onSubmit={handleSendMessage}>
                    <Input
                        variant="outlined"
                        placeholder="Type a message..."
                        fullWidth
                        size="lg"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="mr-2"
                    />
                    <Button
                        type="submit"
                        color="lightBlue"
                        size="lg"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
