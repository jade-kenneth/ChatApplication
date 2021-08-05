import React, { useEffect, useState } from 'react';
import Input from './Input';
import {createUsers, getUsers, validateUsers} from '../actions/userActions';
// import {useDispatch, useSelector} from 'react-redux';
import {ToastContainer, toast  , Zoom, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FcVoicePresentation} from 'react-icons/fc'
// import { AuthorizedUserData } from '../context/UserContext';
import { Redirect } from 'react-router-dom';
import { AuthorizedUserData } from '../Context/UserContext';


import * as api from '../api/index';

const Auth = () => {
    // const userAction = useSelector((state) => state.authReducer);
    // const dispatch = useDispatch();
    const {isFetching,message, messageType,userAction, dispatch} = AuthorizedUserData();
    // useEffect(() => {
    //     dispatch(getUsers());
    // },[dispatch])
    console.log("ows")
    const [showPassword , setShowPassword] = useState(false);
    const [isSignedUp, setSignUp] = useState(false);

    //modal message if something went wrong during fetching data
    const [modalMessage,setMessage] = useState([]);
    // const [password,setPassword] = useState({password: '', confirmPassword: ''});
    const [data, setData] = useState({
        username: '',
        password:'',
        confirmPassword: ''
    })
    
    const createAndResponse = async(userData, dispatch) => {
      const responseMessage =  await createUsers(userData, dispatch); 
      setMessage(responseMessage);
    }
    const validateAndResponse = async(userData, dispatch) => {
      const responseMessage =  await validateUsers(userData, dispatch); 
      setMessage(responseMessage);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword
        }
        if(isSignedUp){
            createAndResponse(userData, dispatch);
        }
        else{
            validateAndResponse(userData, dispatch);
        }
    }
    const toggleChange = (e) => {
        setSignUp(prevState => !prevState);
        setShowPassword("");
        setData({username: '', password: '', confirmPassword: ''})
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]:value});
    }
    useEffect(() => {
        if(!isFetching && modalMessage.messageType === 'error')
            toast.error(`${modalMessage.message}`);
        if(!isFetching && modalMessage.messageType === 'success')
            toast.success(`${modalMessage.message}`);
        return () => {
            setMessage({});
        }
    },[modalMessage.message])
    
    return (
        <>
        <ToastContainer draggable={false} autoClose={3000}/>
        {userAction.isLogged && <Redirect to="/app/chat"/>}
        <div className='authContainer'>
            <form className='authForm' onSubmit={handleSubmit}>
                <div className="app-title">
                    <FcVoicePresentation className="icon"/>
                    <h2>MESSAGE APP</h2> 
                </div>
                
                {!isSignedUp && 
                    <div className="inputs">
                        <Input autoFocus="on" autoComplete='off' placeholder="Username" id="Username" name="username" type="text" handleChange={handleChange} />
                        <Input  autoComplete='off'  placeholder="Password" id="Password" name="password" type={showPassword ? "text" : "password"} handleChange={handleChange}/>
                        <div className="checkBoxDiv">
                            <input type="checkbox" id="checkboxs" checked={showPassword} onChange={() => setShowPassword(prevState => !prevState)}/>
                            <label htmlFor="checkbox"> Show Password</label>
                        </div>
                        <Input  autoComplete='off' disabled={isFetching} value={isFetching ? 'Please wait...' : 'Sign In'} type="submit" handleChange={handleChange} />
                        <h5>Need Account? <span  onClick={toggleChange}> Sign Up</span></h5>
                    </div> }
                {isSignedUp && <div className="inputs">
                    <Input autoFocus autoComplete='off' id="Username" placeholder="Username" name="username" type="text" handleChange={handleChange} />
                    <Input autoComplete='off' id="Password"  placeholder="Password" name="password" handleChange={handleChange} type={showPassword ? "text" : "password"} />
                    <Input  autoComplete='off' id="Confirm Password"  placeholder="Confirm password" handleChange={handleChange} name="confirmPassword" type={showPassword ? "text" : "password"}  />
                    <div className="checkBoxDiv">
                            <input type="checkbox" id="checkboxs"  checked={showPassword} onChange={() => setShowPassword(prevState => !prevState)}/>
                            <label htmlFor="checkbox"> Show Password</label>
                        </div>
                    <Input  autoComplete='off' disabled={isFetching} value={isFetching ? 'Please wait...' : 'Sign Up'} type="submit"  />
                    <h5>Already have an account?  <span onClick={toggleChange}>  Sign In</span></h5>
                </div> }
                    
            </form>
        </div>
        </>
    )
}

export default Auth
