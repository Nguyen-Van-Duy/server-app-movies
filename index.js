import express from 'express'
import http from "http";
import bodyParser from "body-parser";
// import posts from "./routers/Conversations.js"
// import {Server} from "socket.io"
import mongoose from 'mongoose';
import dotenv from "dotenv";
import route from './routers/index.js';
import cors from 'cors'
import connectSocket from './socketIO/index.js';
dotenv.config();

var app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '30mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'}))

const URI = process.env.URI

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
  next();
}

app.use(allowCrossDomain);

// app.use('/', posts)
app.use(cors())
route(app)
connectSocket(server)

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Mongoose');
  }).catch(err => {
    console.log('err', err);
  })

  //socket
//   const socketIo = new Server(server, {
//     cors: {
//       origin: "*",
//     }
//   })

//   let users = []
//   const addUsers = (userId, socketId) => {
//     !users.some(item=> item.userId === userId) && users.push({userId, socketId})
//     console.log(users);
//   }
//   const removeUser = (socketId) => {
//     users = users.filter(user=> user.socketId !== socketId)
//   }

//   const getUser = userId => {
//     console.log("id sender:", userId);
//     console.log("id conversation:", users);
//     const data = users.find(user => user.userId === userId)
//     console.log(data);
//     return data
//   }

// socketIo.on("connection", (socket) => {
//   console.log("a user connected.");

//   // when connect 
//   socket.on("addUser", (userId)=> {
//     console.log("user id",userId);
    
//     addUsers(userId, socket.id)
//     console.log(" array user id",users);
//     socketIo.emit("getUsers", users)

//   })

//   //send and get message
//   socket.on("sendMessage", (data)=> {
//     console.log("receiverId", data);
//     const user = getUser(data.receiverId)
//     console.log("user socketId:",user);
//     if(user?.socketId) {
//       socketIo.to(user.socketId).emit("getMessage", {
//         senderId: data.senderId,
//         text: data.text,
//       })
//     }
//   })

//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     socketIo.emit("getUsers", users);
//     console.log("user remove: ", users);
//   });
  

//   // console.log("New client connected" + socket.id);

//   // socket.emit("getId", socket.id);

//   // socket.on("sendDataClient", function(data) {
//   //   console.log(data)
//   //   socketIo.emit("sendDataServer", { data });
//   // })

//   // socket.on("disconnect", () => {
//   //   console.log("Client disconnected");
//   // });
// });

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server đang chay tren cong ${PORT}`);
});
