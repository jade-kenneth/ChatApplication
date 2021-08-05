
import Conversation from '../models/ConversationModel.js';
import User from '../models/UserModel.js';
export const newConv = ( async (request,response) => {
    const newConversation = await Conversation({ 
        conversationMembers: [request.body.senderId, request.body.receiverId]
    });
    try {
        const saveConversation = await newConversation.save();
        response.status(200).json(saveConversation);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

export const getConversation = ( async (request,response) => {
    try {
        const conversation = await Conversation.find({
            conversationMembers : {$in: [request.params.userId] }
        })
        response.status(200).json(conversation);
    } catch (error) {
        response.status(500).json(error.message);
    }
})


