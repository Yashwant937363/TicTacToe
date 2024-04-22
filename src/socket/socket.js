import io from "socket.io-client";
const socket = io("http://localhost:5000", { autoConnect: false });
export default socket;

export function startConnection() {
  socket.connect();
}

export function getConnection() {
  return new Promise((resolve, reject) => {
    socket.emit("connect:getroomid", (roomid) => {
      if (roomid) {
        resolve(roomid);
      } else {
        reject(new Error("Connection Fail"));
      }
    });
  });
}

export function joinRoom(roomid, playername) {
  return new Promise((resolve, reject) => {
    if (playername?.trim().length <= 0) {
      playername = "Player 2";
    }
    socket.emit("connect:joinroom", roomid, playername, (success) => {
      resolve(success);
    });
  });
}

export function startGame(player1name, roomid) {
  return new Promise((resolve, reject) => {
    if (player1name?.trim().length <= 0) {
      player1name = "Player 1";
    }
    socket.emit("game:startgame", player1name, roomid);
  });
}

export function updateGameState(roomid, index) {
  return new Promise((resolve, reject) => {
    socket.emit("game:changestate", roomid, index);
  });
}

export function restartGame(roomid) {
  return new Promise((resolve, reject) => {
    socket.emit("game:restart", (response) => resolve(response), roomid);
  });
}
