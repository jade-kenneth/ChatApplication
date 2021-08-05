
import Message from '../models/MessageModel.js';

export const addMessage = ( async (request,response) => {
    const newMessage = new  Message(request.body);
    try {
        const saveMessage = await newMessage.save();
        response.status(200).json(saveMessage);
    } catch (error) {
        response.status(500).json(error.message);
    }
});

export const getMessage = ( async (request,response) => {
    try { 
        const messages = await Message.find({
            conversationId: request.params.conversationId
        })
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error.message);
    }
})

