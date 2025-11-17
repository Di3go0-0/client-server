const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwZXBpdG9zQGNvcnJlby5jb20iLCJpYXQiOjE3NjMzNTkwMDEsImV4cCI6MTc2MzQwMjIwMX0.qcjAKa5vhUEqFBULnguGWN1KEUo_Wue6ETb8dyELCrM",
  },
});

// Conexión al servidor
socket.on("connect", () => {
  console.log("Cliente 1 conectado:", socket.id);
});
