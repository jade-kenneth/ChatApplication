import axios from 'axios';


const url = 'http://localhost:4000/app';


export const signUp = (newUser) => axios.post(`${url}/signup`, newUser);  
export const signIn = (checkUser) => axios.post(`${url}/signin`, checkUser);  
export const getConversations = (id) => axios.get(`${url}/conversations/${id}`);  
export const getUsers = (friendId) => axios.get(`${url}/user/${friendId}`);  
export const getMessages = (userId) => axios.get(`${url}/messages/${userId}`)
export const addMessage = (message) => axios.post(`${url}/messages`, message)
export const getAllUsers = () => axios.get(`${url}/users`)
export const newConv = (dataId) => axios.post(`${url}/conversations`, dataId)
