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

app.use(express.static('./src/public'))

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

const PORT = process.env.PORT || 8080
console.log(PORT);

server.listen(PORT, () => {
    console.log(`Server đang chay tren cong ${PORT}`);
});
