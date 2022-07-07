import {Server} from "socket.io"

let users = []
const addUsers = (userId, socketId) => {
  if(userId ===null) {
    users = users.filter(user=> user.socketId !== socketId)
    return
  }
!users.some(item=> item.userId === userId) && users.push({userId, socketId})
// console.log("user online: ",users);
}
const removeUser = (socketId) => {
users = users.filter(user=> user.socketId !== socketId)
}

const getUser = userId => {
const data = users.find(user => user.userId === userId)
return data
}

const connectSocket = (server) => {
    const socketIo = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"] 
        }
    })

    socketIo.on("connection", (socket) => {
        console.log("a user connected.", socket.id);
      
        // when connect 
        socket.on("addUser", (userId)=> {
          
          addUsers(userId, socket.id)
          socketIo.emit("getUsers", users)
          // console.log("get user:", users);
      
        })
      
        //send and get message
        socket.on("sendMessage", (data)=> {
          const user = getUser(data.receiverId)
          if(user?.socketId) {
            socketIo.to(user.socketId).emit("getMessage", {
              senderId: data.senderId,
              text: data.text,
            })
          }
        })

        //get and send invitation
        socket.on("deleteInvitation", data => {
          // console.log(data);
          socketIo.emit("getDeleteInvitation", data)
        })

        socket.on("sendInvitationAddFriend", data=> {
          socketIo.emit("getInvitationAddFriend", data)
        })
      
        //when disconnect
        socket.on("disconnect", () => {
          // console.log("a user disconnected!");
          removeUser(socket.id);
          socketIo.emit("getUsers", users);
        });
      
      });

}

export default connectSocket;