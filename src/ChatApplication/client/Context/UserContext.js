import React, { createContext, useMemo, useContext, useState, useHistory, useReducer, useEffect, useCallback } from "react";
import { authReducer } from "../reducer/authReducer";




const UserContext = createContext();
const MessageActionData= createContext();
const BoolAuthorized = createContext();
const ProfilePicture = createContext();
export function AuthorizedUserData(){
    return useContext(UserContext);
}

export function AuthorizedUserSession(){
    return useContext(BoolAuthorized);
    
}
export function MessageActions(){
    return useContext(MessageActionData);
}
export function TheDefaultPic(){
    return useContext(ProfilePicture);
}



export function UserContextProvider ({children}){
    
    const [userAction, dispatch] = useReducer(authReducer,[],()=>{
            const localData = localStorage.getItem('user');
            return localData ? JSON.parse(localData) : [] ;
    });
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userAction));
        if(userAction.isLogged === false){
            localStorage.removeItem('user');
        }
    }, [userAction])
    
    
    return(
        <UserContext.Provider value={{
        isFetching: userAction.isFetching,
        messageType: userAction.messageType,
        message: userAction.message,
        userAction,
        dispatch}} >


            {children}
            
        </UserContext.Provider>
    )
}