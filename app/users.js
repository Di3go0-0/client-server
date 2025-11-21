const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwZXBpdG9zQGNvcnJlby5jb20iLCJpYXQiOjE3NjM0MTA3ODksImV4cCI6MTc2MzQ1Mzk4OX0.vhZIRVoPuxycrT0gOCppatLkJ-OC48XATxtDgy5RFTA",
  },
});

socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);

  socket.emit("users.actives.subscribe");
});

// 👉 Escuchar cambios en la lista de usuarios
socket.on("users.updated", (users) => {
  console.log("usuarios online:");
  console.log(users);
  console.table(users);
});
