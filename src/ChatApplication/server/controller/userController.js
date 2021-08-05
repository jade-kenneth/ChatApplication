
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
export const signUp = ( async (request,response) => {
    const{ username, password, confirmPassword} = request.body;
    try{
        
        const oldUser = await User.findOne({username});
        //if user already exists promp message
        if(oldUser) return response.status(404).json({message: 'User Already exist'});

        if(password !== confirmPassword) return response.status(400).json({message: 'Password dont match'});
        // so password wont saved in a plain text
        // 12 - level of dificulty to hash password
        
        
        const hashedPassword = await bcrypt.hash(password,12);
        // const result = await User.create({username: `${username}`, password: hashedPassword });
        const newUser = await new User({username: username, password: hashedPassword})

        newUser.save().then(user => response.json('User Added')).catch(err => response.status(400).json('Error '+ err));
        // const token = jwt.sign({username: result.username, id: result._id}, 'test', {expiresponseIn: '1h'});
        const user = newUser;
        response.status(200).json({user});
        // response.status(200).json({result, token});  

    }   
    catch{
        response.status(500).json({ message: "Something went wrong"}); 
    }
})

export const signIn = ( async (request,response) => {
    const{ username, password} = request.body;
    try{
        const oldUser = await User.findOne({username});
        
        const checkPassword = await bcrypt.compare(password , oldUser.password);

        //if password is wrong
        if(!checkPassword) return response.status(400).json({message: "Invalid credentials"});

        // const token = jwt.sign({username: oldUser, id: oldUser._id}, 'test', {expiresponseIn: '1h'})
        const user = oldUser;
        response.status(200).json({user});  
    }
    catch{
        response.status(500).json({ message: "Something went wrong"}); 
    }
})


export const getUsers = ( async (request,response) => {

    const userId = request.params.userId;
    try { 
        const user = await User.find({
            _id: userId
        })
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error.message);
    }
})

export const getAllUsers = ( async (request,response) => {

    
    try { 
        const user = await User.find({});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error.message);
    }
})
