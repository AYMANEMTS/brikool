import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography } from '@mui/material';
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import formatDate from "../../utils/formatDate";

function ChatList({ onSelectChat, user, otherParticipant }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const userId = user._id; // Replace this with actual user ID from auth
                const res = await ClientApi.getUserChats(userId);
                setChats(res.data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        fetchChats();
    }, [user._id]);



    return (
        <List>
            {chats.map((chat) => (
                <React.Fragment key={chat._id}>
                    <ListItem button onClick={() => onSelectChat(chat)} className="hover:bg-gray-100">
                        <ListItemAvatar>
                            <Avatar
                                src={displayImage("", otherParticipant(chat))}
                                alt={otherParticipant(chat)?.name}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" className="font-semibold">
                                    {otherParticipant(chat)?.name}
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Typography variant="body2" color="textSecondary" noWrap>
                                        {chat?.lastMessage || 'No messages yet'}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" className="block mt-1">
                                        {chat?.updatedAt
                                            ? formatDate(chat.updatedAt)
                                            : ''}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
}

export default ChatList;
