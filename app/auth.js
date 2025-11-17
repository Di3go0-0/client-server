const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
});

// Register;
socket.emit(
  "auth.register",
  {
    userName: "pepitoss",
    email: "pepitoss@correo.com",
    password: "Password123!",
  },
  (response) => {
    console.log("Respuesta del servidor:", response);

    if (response.success) {
      console.log("response", response.success);
    } else {
      console.log("Error in register:", response.message);
    }
  },
);

// Login
socket.emit(
  "auth.login",
  { email: "pepito@correo.com", password: "Password123!" },
  (response) => {
    console.log("Respuesta del servidor:", response);

    if (response.success) {
      const token = response.token;
      console.log(token);
    } else {
      console.log("Error de login:", response.message);
    }
  },
);
