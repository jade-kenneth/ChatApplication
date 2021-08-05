
import express from 'express';


import {signIn , signUp, getUsers, getAllUsers} from '../controller/userController.js';
const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/user/:userId', getUsers);
router.get('/users', getAllUsers);
export default router;