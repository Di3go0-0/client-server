const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwZXBpdG9zQGNvcnJlby5jb20iLCJpYXQiOjE3NjM0MDU2MDYsImV4cCI6MTc2MzQ0ODgwNn0.KINBguEqX4KE9gfhdYF908Zb9WTn66olpfl9Vulr5IY",
  },
});

socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);

  // 👉 Suscribirse a la room 1
  socket.emit("users.room.subscribe", 1);
});

// 👉 Escuchar cambios en la lista de usuarios
socket.on("users.room.updated", (users) => {
  console.log("Lista de usuarios actualizada en la Room 1:");
  console.table(users);
});
