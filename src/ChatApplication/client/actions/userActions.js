import React, {useState} from 'react';
import * as api from '../api';



export const createUsers = async (user, dispatch)  => {
    
    dispatch({type: 'LOGIN_STARTED'})  
    try {
        const {data} = await api.signUp(user);  
        dispatch({type: 'CREATE_USER', newUser: data});
        
        
    } catch (error) {
        if(error.message == "Request failed with status code 404"){
            console.log(error.message);
            dispatch({type: "INCORRECT_CREDENTIALS" })
            return {message: 'Username already exists!', messageType: 'error' };
        }
        if(error.message == "Request failed with status code 400" ){
            dispatch({type: "INCORRECT_CREDENTIALS"  })
            return {message: `Password don't match!`, messageType: 'error'};

        }
        if(error.message == "Request failed with status code 500"){
            dispatch({type: "INCORRECT_CREDENTIALS" })
            return {message: `Something went wrong`, messageType: 'error' };

        }
    }
    
}
export const validateUsers = async(user,dispatch) => {
    dispatch({type: 'LOGIN_STARTED'})
    try {
        const {data} = await api.signIn(user);
        dispatch({type: 'VALIDATED_USER', oldUser: data});
        
        
    } catch (error) {
        dispatch({type: "INCORRECT_CREDENTIALS"})
        return {message: 'Incrorrect username or password',  messageType: 'error' };
    }
    
}



