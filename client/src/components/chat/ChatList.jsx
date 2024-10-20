import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography } from '@mui/material';
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import formatDate from "../../utils/formatDate";
import {useQuery} from "react-query";

function ChatList({ onSelectChat, otherParticipant }) {
    const {data:chats=[]} = useQuery('chat',ClientApi.getUserChats,{
        select: (data => data.data),
        retry: 0
    })

    return (
        <List>
            {chats.map((chat) => (
                <React.Fragment key={chat._id}>
                    <ListItem  onClick={() => onSelectChat(chat)} className="hover:bg-gray-100">
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
