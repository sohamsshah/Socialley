const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./server/utils/users')

const PORT = process.env.PORT || 8080;

// init
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// db init

const { initializeDBConnection } = require("./server/db/db.connect");
initializeDBConnection();

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const user = require("./server/routes/user.router");
const room = require("./server/routes/room.router");
app.use("/user", user);
app.use("/room", room);

app.get("/", (req, res) => {
  res.send({ success: true });
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on('joinRoom', ({ userId, roomId }) => {
    
    const user = userJoin(userId, roomId);
    console.log(user) // user = {userId, roomId}

    socket.join(user.roomId);

    // Broadcast when a user connects
    socket.broadcast
      .to(user.roomId)
      .emit(
        'message',
        `${user.userId} has joined the chat`
      );

    // Send users and room info
    io.to(user.roomId).emit('roomUsers', {
      roomId: user.roomId,
      users: getRoomUsers(user.roomId)
    });
    

    socket.on('disconnect', () => {
        const user = userLeave(userId);
        console.log(user, "disconnected");
        if (user) {
          io.to(user.roomId).emit(
            'message',
             `${user.userId} has left the chat`
          );}})
    
    //       // Send users and room info
    //       io.to(user.room).emit('roomUsers', {
    //         room: user.room,
    //         users: getRoomUsers(user.room)
    //       });
    //     }
    //   });
});});




const server_port = process.env.YOUR_PORT || process.env.PORT || PORT;
server.listen(server_port, () => {
  console.log("Server running on PORT : " + server_port);
});
