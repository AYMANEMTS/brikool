const Chat = require('../models/Chat');
const User = require('../models/User');


// Create or get an existing chat between two users
const getChat = async (req, res) => {
    const { userId1, userId2 } = req.params;

    try {
        // Check if a chat between the users exists
        let chat = await Chat.findOne({ participants: { $all: [userId1, userId2] } });
        if (!chat) {
            // Create new chat if none exists
            chat = new Chat({ participants: [userId1, userId2] });
            await chat.save();
        }
        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching chat' });
    }
};

// Send a message
const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { senderId, content } = req.body;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ error: 'Chat not found' });

        const newMessage = { sender: senderId, content };
        chat.messages.push(newMessage);
        chat.lastMessage = content;
        chat.updatedAt = Date.now();

        await chat.save();
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

// Fetch all chats for a user
const getUserChats = async (req, res) => {
    const { userId } = req.params;
    try {
        const chats = await Chat.find({ participants: userId })
            .populate('participants', 'name image')  // Get participant details
            .sort({ updatedAt: -1 });  // Sort by latest messages
        if (!chats.length) {
            return res.status(404).json({ message: 'No chats found for this user' });
        }
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching chats' });
    }
};


module.exports = { getChat, sendMessage, getUserChats };