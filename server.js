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

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const user = require("./server/routes/user.router");
app.use("/user", user);

io.on("connection", (socket) => {
  console.log("connected");
});

const server_port = process.env.YOUR_PORT || process.env.PORT || PORT;
server.listen(server_port, () => {
  console.log("Server running on PORT : " + server_port);
});
