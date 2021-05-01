const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 8080;

// init
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) => {
    res.send({success:true});
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

io.on('connection', (socket)=> {
    console.log("connected");
});


const server_port = process.env.YOUR_PORT || process.env.PORT || PORT;
server.listen(server_port, () => {
    console.log("Server running on PORT : "+ server_port);
})