import React from 'react';
import { List, ListItem, Avatar, Typography } from '@material-tailwind/react';
import ClientApi from "../../api/ClientApi";
import displayImage from "../../utils/imageFromServer";
import formatDate from "../../utils/formatDate";
import { useQuery } from "react-query";

function ChatList({ onSelectChat, otherParticipant }) {
    const { data: chats = [] } = useQuery('chat', ClientApi.getUserChats, {
        select: (data) => data.data,
        retry: 0
    });

    return (
        <List>
            {chats.map((chat) => (
                <React.Fragment key={chat._id}>
                    <ListItem onClick={() => onSelectChat(chat)} className="hover:bg-gray-100 cursor-pointer">
                        <div>
                            <Avatar
                                src={displayImage("", otherParticipant(chat))}
                                alt={otherParticipant(chat)?.name}
                            />
                        </div>
                        <div className="ml-3 w-full">
                            <Typography className="font-semibold text-lg">
                                {otherParticipant(chat)?.name}
                            </Typography>
                            <Typography className="text-sm text-gray-600 truncate">
                                {chat?.lastMessage || 'No messages yet'}
                            </Typography>
                            <Typography className="text-xs text-gray-500 mt-1">
                                {chat?.updatedAt ? formatDate(chat.updatedAt) : ''}
                            </Typography>
                        </div>
                    </ListItem>
                    {/* Custom Divider */}
                    <div className="border-t border-gray-300 my-1" />
                </React.Fragment>
            ))}
        </List>
    );
}

export default ChatList;
