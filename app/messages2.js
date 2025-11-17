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

// Suscribirse a la sala 1
socket.emit("messages.suscribe", { id: 2 });

// Escuchar mensajes de la sala
socket.on("messages.suscription", (messages) => {
  if (Array.isArray(messages)) {
    console.log("Mensajes históricos:", messages);
  } else {
    console.log("Nuevo mensaje:", messages);
  }
});

// Función para enviar mensajes en tiempo real
function sendMessage(msg) {
  socket.emit("users-send.message", {
    roomId: 2,
    message: msg,
  });
}

// Ejemplo de uso: enviar mensaje desde la terminal
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.on("line", (input) => {
  sendMessage(input);
});
