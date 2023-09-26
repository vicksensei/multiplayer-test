const express = require("express");
const app = express();

//this is socket.io setup
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 9001;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

console.log("Starting server...");
