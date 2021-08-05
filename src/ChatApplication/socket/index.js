const io = require('socket.io')(5000, {
    cors: {
        origin: "*"
    },
});

let users = [];

const sendUser = (userId, socketId) => {
    //if user is not already in user array then add the user with current userId and socketId
    !users.some(user=> user.userId === userId) && users.push({userId, socketId});
}
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}

const getReceiver = (receiverId) => {
    return users.find(user=> user.userId === receiverId);
}
io.on("connection", (socket) => {
    console.log("connected");
    //TAKE EVENT FROM CLIENT
    socket.on("sendUser", userId=> {
        // send user and add to array of user
        sendUser(userId, socket.id);
        // sending to client
        io.emit("getUsers", users);
    })
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const receiver = getReceiver(receiverId);
        io.to(receiver.socketId).emit("getMessage", {senderId,text});
        
        
    })
    socket.on("disconnect", () => {
        console.log("disconnected");
        removeUser(socket.id);
        
        io.emit("getUsers", users);

    })
    
})
