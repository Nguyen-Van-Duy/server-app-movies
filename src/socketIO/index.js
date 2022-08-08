import {Server} from "socket.io"

let users = []
let groupRTC = []
let groupNotification = []
const addUsers = (userId, socketId) => {
  if(userId ===null) {
    users = users.filter(user=> user.socketId !== socketId)
    return
  }
!users.some(item=> item.userId === userId) && users.push({userId, socketId})
// console.log("user online: ",users);
}

const setGroupPeer = (data) => {
  if(data.userId ===null) {
    groupRTC = groupRTC.filter(user=> user.socketId !== data.socketId)
    return
  }
!groupRTC.some(item=> item.userId === data.userId) && groupRTC.push(data)
// console.log("user online: ",users);
}

const removeUserRTC = (socketId) => {
  groupRTC = groupRTC.filter(user=> user.socketId !== socketId)
}

const removeUser = (socketId) => {
  users = users.filter(user=> user.socketId !== socketId)
}


const getUser = userId => {
  const data = users.find(user => user.userId === userId)
  return data
}

const handleGroupNotification = listNotification => {
  if(groupNotification.length > 0) {
    const newArray = []
    const result = listNotification.forEach(data => {
      if(!groupNotification.find(item=>item._id === data._id)) {
        newArray.push(data)
      }
    })
    groupNotification.concat(newArray)
  } else {
    groupNotification = listNotification
  }
}

const connectSocket = (server) => {
    const socketIo = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"] 
        }
    })

    socketIo.on("connection", (socket) => {
        console.log("a user connected.", socket.id, users);
      
        // when connect 
        socket.on("addUser", (data)=> {
          
          addUsers(data.userId, socket.id)
          socketIo.emit("getUsers", users)
          console.log("get user:", users);
      
        })
      
        //send and get message
        socket.on("sendMessage", (data)=> {
          const user = getUser(data.receiverId)
          console.log("user: ", data.receiverId);
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

        //get notification
        socket.on("Group-Notification", listNotification => {
          handleGroupNotification(listNotification)
          console.log("notification: ", groupNotification);
        })

        //RTC
        socket.on("addGroupRTC", data => {
          const params = {...data, socketId: socket.id}
          setGroupPeer(params)
          console.log("groupRTC: ", groupRTC);
          socketIo.emit("getGroupRTC", groupRTC)
        })
      
        //when disconnect
        socket.on("disconnect", () => {
          // console.log("a user disconnected!");
          removeUserRTC(socket.id)
          removeUser(socket.id);
          socketIo.emit("getUsers", users);
        });
      
      });
}

export default connectSocket;