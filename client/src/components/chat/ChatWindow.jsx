import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import io from 'socket.io-client';
import formatDate from "../../utils/formatDate"; // Your utility for formatting dates

const socket = io('http://localhost:8000'); // Replace with your server's URL

function ChatWindow({ chat, onBack, user, otherParticipant }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId1 = chat?.participants[0]?._id;
    const userId2 = chat?.participants[1]?._id;
    const messagesEndRef = useRef(null); // Create a ref for the messages container

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await ClientApi.getChat(userId1, userId2); // Fetch messages for this chat
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
            const res = await ClientApi.sendMessage(chatId, {
                senderId: user._id,
                content: newMessage
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
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    {/* Back Button for small screens */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={onBack}
                        className="md:hidden"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Avatar src={displayImage("", otherParticipant(chat))} alt={otherParticipant(chat)?.name} className="mr-2" />
                    <Typography variant="h6" noWrap>
                        {otherParticipant(chat)?.name}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Messages Area */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px - 56px)' }}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${message.sender === user?._id ? 'items-end' : 'items-start'} mb-2`}
                    >
                        <div
                            className={`max-w-xs p-2 m-1 rounded-lg shadow ${message.sender === user?._id ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        >
                            <Typography variant="body1">{message.content}</Typography>
                        </div>
                        {/* Timestamp */}
                        <Typography variant="caption" color="textSecondary" className="px-2">
                            {formatDate(message?.timestamp)}
                        </Typography>
                    </div>
                ))}
                <div ref={messagesEndRef} />
                {/* This div will help us scroll to the bottom */}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-300">
                <form className="flex" onSubmit={handleSendMessage}>
                    <TextField
                        variant="outlined"
                        placeholder="Type a message..."
                        fullWidth
                        size="small"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="ml-2"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ChatWindow;
