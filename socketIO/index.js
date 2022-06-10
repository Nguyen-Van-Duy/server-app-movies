import {Server} from "socket.io"

let users = []
const addUsers = (userId, socketId) => {
!users.some(item=> item.userId === userId) && users.push({userId, socketId})
console.log(users);
}
const removeUser = (socketId) => {
users = users.filter(user=> user.socketId !== socketId)
}

const getUser = userId => {
console.log("id sender:", userId);
console.log("id conversation:", users);
const data = users.find(user => user.userId === userId)
console.log(data);
return data
}

const connectSocket = (server) => {
    const socketIo = new Server(server, {
        cors: {
          origin: "*",
        }
    })

    socketIo.on("connection", (socket) => {
        console.log("a user connected.");
      
        // when connect 
        socket.on("addUser", (userId)=> {
          console.log("user id",userId);
          
          addUsers(userId, socket.id)
          console.log(" array user id",users);
          socketIo.emit("getUsers", users)
      
        })
      
        //send and get message
        socket.on("sendMessage", (data)=> {
          console.log("receiverId", data);
          const user = getUser(data.receiverId)
          console.log("user socketId:",user);
          if(user?.socketId) {
            socketIo.to(user.socketId).emit("getMessage", {
              senderId: data.senderId,
              text: data.text,
            })
          }
        })
      
        //when disconnect
        socket.on("disconnect", () => {
          console.log("a user disconnected!");
          removeUser(socket.id);
          socketIo.emit("getUsers", users);
          console.log("user remove: ", users);
        });
      
      });

}

export default connectSocket;