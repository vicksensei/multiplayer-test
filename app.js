const express = require("express");
const app = express();

//this is socket.io setup
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 9001;

app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "index.html");
// });

const players = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log("players :>> ", players);

  socket.on("PlayerJoined", (playerName) => {
    const colorMax = 16777215;
    const color = Math.floor(Math.random() * colorMax);
    const bgColor = color > colorMax / 2 ? "000" : "FFF";
    players[socket.id] = {
      username: playerName,
      score: 0,
      color: `#${color.toString(16)}`,
      bgColor: `#${bgColor}`,
      canBuzz: false,
    };
    console.log("players :>> ", players);
    io.emit("updatePlayers", players);
  });

  socket.on("disconnect", (reason) => {
    console.log("Player Disconnect Reason :>> ", reason);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

console.log("Starting server...");
