import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

const mockChats = [
    { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
    // Add more mock chats or fetch from your data source
];

function ChatList({ onSelectChat }) {
    return (
        <List>
            {mockChats.map((chat) => (
                <React.Fragment key={chat.id}>
                    <ListItem button onClick={() => onSelectChat(chat)} className="hover:bg-gray-100">
                        <ListItemAvatar>
                            <Avatar src={chat.avatar} alt={chat.name} />
                        </ListItemAvatar>
                        <ListItemText primary={chat.name} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
}

export default ChatList;
