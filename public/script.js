let username = "";
const socket = io();

socket.on("updatePlayers", (players) => {
  const list = document.getElementById("list");
  list.innerHTML = "";
  for (let i = 0; i < Object.keys(players).length; i++) {
    const key = Object.keys(players)[i];
    const player = players[key];

    const element = document.createElement("div");
    element.style = `color: ${player.color}; background-color${player.bgColor}`;
    element.innerHTML = player.username;
    element.classList = player.canBuzz ? "active" : "inActive";
    list.appendChild(element);
  }
});

function Click() {
  const list = document.getElementById("list");
  const login = document.getElementById("login");
  const userInputElement = document.getElementById("username");

  username = userInputElement.value;
  socket.emit("PlayerJoined", username);
  list.innerHTML = username;
  login.style.visibility = "hidden";
}
