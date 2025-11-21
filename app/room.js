const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJwZXBpdG9AY29ycmVvLmNvbSIsImlhdCI6MTc2MzQwOTIxNiwiZXhwIjoxNzYzNDUyNDE2fQ.A9RbALK-YpqEy2DUMvUuCewhQiF3oDAZ8f5zpN-KnmE",
  },
});

socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);

  // 👉 Suscribirse a la room 1
  socket.emit("users.room.subscribe", 1);
});

// 👉 Escuchar cambios en la lista de usuarios
socket.on("users.room.updated", (users) => {
  console.log("Lista de usuarios actualizada en la Room ");
  console.table(users);
});
