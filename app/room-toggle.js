const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJwZXBpdG9AY29ycmVvLmNvbSIsImlhdCI6MTc2MzQwMjY2NSwiZXhwIjoxNzYzNDQ1ODY1fQ.zuT1RpJUCQJEm3NHDgmNngE44O5RNI_7LZl3F124zPg", // token falso
  },
});

socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);

  // socket.emit("left_room", 1);

  socket.emit("join_room", 1);
});
