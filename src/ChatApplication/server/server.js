import express from 'express';
const app = express();
//mongo db library
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js';
import conversationRoute from './routes/conversationRoutes.js';
import messageRoute from './routes/messageRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 4000;
//for security since our database consists of username of password of the admin
dotenv.config();


// activate body parser in application

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//this will append to /app and form as /app/routesUrls which is the sign up like this /app/signup

app.use('/app', conversationRoute);
app.use('/app', messageRoute);

app.use('/app', userRoute);


//server.js sends reuest  to route.js file that has the router.post
// which process post request and sends back a response
mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);



