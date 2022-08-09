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
  if(groupNotification.length > 0 && listNotification.length > 0) {
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

const setNotification = (data, id, currentChat) => {
  if(groupNotification.length <= 0) {
    return
  }
  if(currentChat) {
    const indexRoomClose = groupNotification.findIndex(item=> item._id === currentChat._id)
    const indexOfListUser = currentChat.list_user.findIndex(item=> item.in_room === true)
    if(groupNotification[indexRoomClose]) {
      groupNotification[indexRoomClose].list_user[indexOfListUser] = {...groupNotification[indexRoomClose].list_user[indexOfListUser], in_room: false}
    }
  }
  const index = groupNotification.findIndex(item=> item._id === id)
  if(groupNotification[index]) {
    const indexItem = groupNotification[index].list_user.findIndex(item=> item.user_id === data.user_id)
    groupNotification[index].list_user[indexItem] = data
  }
  return groupNotification[index]
}

const addNotification = data => {
  if(groupNotification.length <= 0) {
    return
  }
  const index = groupNotification.findIndex(item=>item._id === data.conversationId)
  groupNotification[index].list_user.forEach((item, indexOfListUser)=>{
    if(item.user_id !== data.senderId) {
      if(!item.in_room) {
        const notificationChange = groupNotification[index].list_user[indexOfListUser]
        groupNotification[index].list_user[indexOfListUser] = {...notificationChange, notification: Number(notificationChange.notification) + 1}
      }
    }
  })
  return groupNotification[index].list_user
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

        //get notification
        socket.on("GroupNotification", listNotification => {
          handleGroupNotification(listNotification.userConversation)

          // socketIo.emit("GetGroupNotification", groupNotification)
        })

        socket.on("InRoom", notification => {
          const newData = setNotification(notification.newNotification, notification.id, notification.currentChat);
          socketIo.emit("GetRoom", groupNotification)
        })

        socket.on("AddNotification", notification => {
          const newNumber = addNotification(notification)
          console.log("newNumber: ", newNumber);
          socketIo.emit("GetNotification", groupNotification)
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