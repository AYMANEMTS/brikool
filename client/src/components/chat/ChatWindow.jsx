import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ChatWindow({ chat, onBack }) {
    const handleSendMessage = (e) => {
        e.preventDefault();
        // Implement message sending logic here
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
                    <Avatar src={chat.avatar} alt={chat.name} className="mr-2" />
                    <Typography variant="h6" noWrap>
                        {chat.name}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {/* Example messages */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-start">
                        <div className="max-w-xs bg-white p-2 rounded-lg shadow">
                            <Typography variant="body1">Hello!</Typography>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="max-w-xs bg-blue-500 text-white p-2 rounded-lg shadow">
                            <Typography variant="body1">Hi there!</Typography>
                        </div>
                    </div>
                    {/* Add more messages dynamically */}
                </div>


            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-300">
                <form className="flex" onSubmit={handleSendMessage}>
                    <TextField
                        variant="outlined"
                        placeholder="Type a message..."
                        fullWidth
                        size="small"
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
