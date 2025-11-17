const { io } = require("socket.io-client");

const socket = io("http://localhost:3100", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJwZXBpdG9AY29ycmVvLmNvbSIsImlhdCI6MTc2MzM1OTYwNywiZXhwIjoxNzYzNDAyODA3fQ.YMExqmheKnk90KGTLkHPVKZ_oifswTICnygfalEsS_I",
  },
});

socket.on("connect", () => {
  console.log("Cliente 2 conectado:", socket.id);
});

// Suscribirse a la misma sala
socket.emit("messages.suscribe", { id: 2 });

// Recibir mensajes
socket.on("messages.suscription", (messages) => {
  if (Array.isArray(messages)) {
    console.log("Mensajes históricos:", messages);
  } else {
    console.log("Nuevo mensaje:", messages);
  }
});

// Función para enviar mensajes
function sendMessage(msg) {
  socket.emit("users-send.message", {
    roomId: 2,
    message: msg,
  });
}

// Leer mensajes desde la terminal
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.on("line", (input) => {
  sendMessage(input);
});
