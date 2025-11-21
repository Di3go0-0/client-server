const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwZXBpdG9zQGNvcnJlby5jb20iLCJpYXQiOjE3NjM0MDk3MTIsImV4cCI6MTc2MzQ1MjkxMn0.bWPImPWQHNyMuYQyx2S3_OgwWcFmkLrw4a1HpOwzCpI", // token falso
  },
});

socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);

  // socket.emit("left_room", 1);

  socket.emit("join_room", 1);
});
