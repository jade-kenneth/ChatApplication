import React , {useEffect,  useRef, useState} from 'react'
// import {useSelector} from 'react-redux';
import  {Redirect, useHistory} from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthorizedUserData } from '../Context/UserContext';
import {AiOutlineSend} from 'react-icons/ai'
import '../Chat/scss/chatStyle.css';
import Message from '../Message/Message';
import UsersConversation from '../UsersConversation/UsersConversation';
import {getConversations, getMessages,getAllUsers,newConv, getUsers, addMessage} from  '../actions/messengerActions';
import {io} from 'socket.io-client';
import AllUserApp from '../AllUserApp/AllUserApp';




const Chat = () => {
    // const user = useSelector((state) => state.authReducer)
    const {userAction: user, dispatch} = AuthorizedUserData();

    //all conversation associated with user 
    const [conversations, setConversations] = useState([]);
    let [allUser, setAllUsers] = useState([]);
    // current active message between user
    const [activeMessage, setActiveMessage] = useState([])
    const history= useHistory();
    const [messageToArrive, setMessageToArrive] = useState(null);

    const socket = useRef(null);
    const messageRef = useRef();
    //user currently converse with
    const [activeFriendUser, setActiveFriendUser] = useState(null)
    const [activeFriendUserId, setActiveFriendUserId] = useState(null)
    // client message
    const [newMessage, setNewMessage] = useState('');
    

    
    const [sender, setSender] = useState(null);
    const [online, setOnline] = useState([]);
    
    const [messageData, setMessageData] = useState([]);

    const createConv = async(id) => {
        let exist= false;
        const members = {
            receiverId:id,
            senderId:user.userLoginData.user._id
        }
        conversations.map((conv) => {
            console.log(conv);
            if( conv.conversationMembers.some((data) => data === id)){
                exist = true;
            }
        })
        console.log(exist);
        if(exist=== false){
            const newCon = await newConv(members);
            setConversations(curr => [...curr, newCon]);
            toast.success("Successfully added in contact list!");
            
        }
        else{
            toast.error("Already exist in the contact list!");
            exist = false;
        }
        
        
    } 
    const getSender = async(senderId) => {
        let sender;
        // console.log(friendId);
        
            const senderData =  await getUsers(senderId);
            
            senderData.map((data) => {
               
                sender = data.username;
            })
        setSender(sender);
    }
    useEffect(async() => {
        
        const res = await getAllUsers();
        setAllUsers(res);
    },[])
    useEffect(() => {
        socket.current = io("ws://localhost:5000")
        socket.current.on("getMessage", (data) => {
            
            setMessageToArrive({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                
            });
            getSender(data.senderId);
            
        });

    },[])
    
    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageData]);
    
    useEffect(() => {
        
        try{
            sender !== null && messageToArrive && activeMessage?.conversationMembers.includes(messageToArrive.sender) && 
            setMessageData(currMessage => [...currMessage, messageToArrive]);
            sender !== null && messageToArrive &&  toast.info(`You have new message from ${sender}!`) ;

        }
        catch(err){
            toast.info(`${sender} is trying to connect with you add him/her now and have an open conversation!`) ;
        }
       
    },[messageToArrive, sender])
    
    useEffect(() => {
        //send event to server
        socket.current.emit("sendUser", user.userLoginData.user._id)
        //get from server
        socket.current.on("getUsers", users=>{
            setOnline(users);
        })
    },[user])
    useEffect( async() => {
        const res = await getConversations(user.userLoginData.user._id, dispatch);
        setConversations(res);
        
    },[user.userLoginData.user._id])
    
    
    useEffect( async () => {
        
        const res = await getMessages(activeMessage._id);
        setMessageData(res);
    },[activeMessage._id])

    const sendTheMessage = async(sendMessage) => {
        socket.current.emit("sendMessage", {
            senderId: user.userLoginData.user._id,
            receiverId: activeFriendUserId,
            text: newMessage
        })
        const theMessage = await addMessage(sendMessage);
        setMessageData(curr=> [...curr, theMessage]);
        setNewMessage(''); 
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const sendMessage = {
            conversationId: activeMessage._id,
            sender: user.userLoginData.user._id,
            text: newMessage
        }
        online.find((user) => user.userId === activeFriendUserId ) ? sendTheMessage(sendMessage) : toast.error(`${activeFriendUser} is not online`);
        setNewMessage('');
    }
    // useEffect(() => {

    // },[online])
    const handleChange =(e) => {
        e.preventDefault();
        setNewMessage(e.target.value);
        
    }
    const handleClick = async(conv) => {
        
            const friendId = conv.conversationMembers.find((id) => id !== user.userLoginData.user._id);
                // console.log(friendId);
                
                    const userToMessage =  await getUsers(friendId);
                    userToMessage.map((data) => {
                        setActiveFriendUser(data.username);
                        setActiveFriendUserId(data._id);
                    })
            

    }
    
    const handleLogout = async() => {
        const clear = await dispatch({type: "LOGGED_OUT"});
        const clearStorage = await history.push('/');
        
    }
    return (
        <>
        <ToastContainer draggable={false} autoClose={3000}/>
        {!user.isLogged &&  <Redirect to="/"/>}
        <div className="userUI">
                        <h2>{user.userLoginData.user.username}</h2>
                        <button className="logout" onClick={() => handleLogout()}>Logout</button>
                    </div>
        {user.isLogged && 
        
        <div className="container">
            <div className="allUser">
                <div className="container">
                    <h2 className="title">All Users</h2>
                    {allUser.map((data) => {
                        const {_id, username} = data;
                        return (    
                            <div className="user" onClick={() => createConv(_id)}>
                                {user.userLoginData.user._id !== _id && <AllUserApp  id={_id} username={username}/> }
                            </div>
                            
                        )
                    })}
                   
                </div>
            </div>
            <div className="chatArea">
            {activeFriendUser ?
                <form className="container" onSubmit={handleSubmit}>
                
                    <div className="name">
                    
                        <div className="custom-avatar">
                            
                            <h1>{`${activeFriendUser.substring(0,1)}`}</h1>
                        </div>
                        <div className="col">
                            <h2>{`${activeFriendUser}`}</h2>
                            <h5 className={online.find((data) => data.userId === activeFriendUserId) ? "online" : "offline"}>{online.find((data) => data.userId === activeFriendUserId) ? "is Online" : "is Offline"}</h5>
                        </div>
                        
                    </div>
                    
                    <div className="body" >
                        {messageData.map((data) => {
                            return(
                                <div ref={messageRef} >
                                <Message time={data.createdAt} message={data.text} messageOwner={data.sender === user.userLoginData.user._id}name={`${activeFriendUser.substring(0,1)}`} />
                                </div>
                            )
                        })}
                            
                    </div>
                    
                    <div className="send" >
                        <div className="sendUI">
                            <input type="text" placeholder="Type message.." value={newMessage} onChange={handleChange}/>
                            <button type="sumbit"><AiOutlineSend className="icon" /></button>
                        </div>
                    </div>
                </form> : <form className="container"> <h2>CHAT WITH OTHER USERS {user.userLoginData.user.username}!</h2></form>
                }
            </div>
            <div className="allFriends">
                   
                    <div className="container">
                        <div className="contactText">
                            <h2 >Contacts</h2>
                            
                        </div>
                    
                        {conversations.map((conv) => {
                            
                            return(
                                <div onClick={() => {setActiveMessage(conv); handleClick(conv)}}>
                                <UsersConversation  online={online} conversation={conv} currentUserId={user.userLoginData.user._id} name={user.userLoginData.user.username}/>
                                </div>
                            )
                        })}
                        
                    </div>
            </div>
            
        </div>}
        </>
    )
}

export default Chat
