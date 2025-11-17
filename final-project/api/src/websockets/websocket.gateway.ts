import { MessageBody, WebSocketGateway as NestWebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

@NestWebSocketGateway()
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)

  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconected: ${client.id}`)
  }

  @SubscribeMessage('rooms')
  handleMessage(@MessageBody() data: any) {
    console.log(data)
    this.server.emit('mesajeServer', 'Texto recibido ')
  }

}

