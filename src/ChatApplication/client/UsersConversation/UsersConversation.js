import React, { useEffect, useState } from 'react'
import '../UsersConversation/scss/users.css';
import {getUsers} from '../actions/messengerActions';
const UsersConversation = ({online, conversation, currentUserId, name}) => {
    const [user, setUser] = useState([]);
    
    useEffect( async () => {
        const friendId = conversation.conversationMembers.find((id) => id !== currentUserId);
        
        
            const friend =  await getUsers(friendId);
            setUser(friend);

        
        
    },[currentUserId])
    
    return (
        <div className="user-container">
            
            <div className="user-content">
                
                {user.map((data) => {
                    
                    
                    return(
                        <React.Fragment key={data._id}>
                        
                        <div className={online.find((id) => id.userId === data._id) ? "custom-avatar online" : "custom-avatar offline"}>
                            
                            
                            <h3 >{`${data.username.substring(0,1)}`}</h3> 
                        </div>
                    
                        
                        <h2>{data.username}</h2>
                        <div className="notif">
                            
                        </div>
                        </React.Fragment>
                    )
                })}
                
                
            </div>
            
        
        </div>
    )
}
export default UsersConversation;
