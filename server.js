const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("joinRoom", ({ userId, roomId }) => {
    console.log(userId, roomId);
    socket.join(roomId);
    socket.broadcast
      .to(roomId)
      .emit("message", `${userId} has joined the chat`);
  });
  // io.to(roomId).emit("roomUsers", {
  //   roomId: user.roomId,
  //   users: getRoomUsers(user.roomId),
  // });

  // const { savedRoom, user } = userJoin(userId, roomId);
  // console.log(user); // user = {userId, roomId}
  // console.log(savedRoom);

  // if (user && savedRoom) {
  //   socket.join(savedRoom._id);
  // }

  // // Broadcast when a user connects
  // socket.broadcast
  //   .to(savedRoom._id)
  //   .emit("message", `${user.username} has joined the chat`);

  // // Send users and room info
  // io.to(savedRoom._id).emit("roomUsers", savedRoom);

  // const user = userJoin(userId, roomId);
  // console.log(user) // user = {userId, roomId}

  // if (user) {
  //   socket.join(user.roomId);
  // }

  // // Broadcast when a user connects
  // socket.broadcast
  //   .to(user.roomId)
  //   .emit(
  //     'message',
  //     `${user.userId} has joined the chat`
  //   );

  // // Send users and room info
  // io.to(user.roomId).emit('roomUsers', {
  //   roomId: user.roomId,
  //   users: getRoomUsers(user.roomId)
  // });

  socket.on("disconnect", () => {
    console.log("User has left the discussion");
  });

  socket.on("message", ({ roomId, message }) => {
    io.emit("message", { message });
  });
});

const server_port = process.env.YOUR_PORT || process.env.PORT || PORT;
server.listen(server_port, () => {
  console.log("Server running on PORT : " + server_port);
});
