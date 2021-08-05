import * as api from '../api';

export const getConversations = async(id,dispatch) => {
    
    try {
        const {data} = await api.getConversations(id);
        return data;
        // dispatch({type: 'VALIDATED_USER', oldUser: data, message: 'Good to be back', messageType: 'success'});
    } catch (error) {
        // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
    }
    
}

export const getUsers = async(friendId, dispatch) => {
    
    try {
        const {data} = await api.getUsers(friendId);
        
        
        return data;
    } catch (error) {
        // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
    }
    
}
export const getAllUsers = async() => {
    
    try {
        const {data} = await api.getAllUsers();
        
        
        return data;
    } catch (error) {
        // dispatch({type: "INCORRECT_CREDENTIALS", message: 'Incrorrect username or password', messageType: 'error'})
    }
    
}

export const getMessages = async(userId) => {
    try {
        const {data} = await api.getMessages(userId);
        return data;
    } catch (error) {
        
    }
}
export const addMessage = async(message) => {
    try {
        const {data} = await api.addMessage(message);
        return data;
    } catch (error) {
        
    }
}
export const newConv = async(dataId) => {
    try {
        const {data} = await api.newConv(dataId);
        return data;
    } catch (error) {
        
    }
}