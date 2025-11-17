import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../../modules/rooms/rooms.service';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) { }

  handleConnection(client: Socket) {
    console.log(`🔌 Client connected: ${client.id}`);

  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
  }


  @OnEvent('room.created')
  handleRoomCreated(payload: any) {
    this.server.emit('room_created', payload);
  }

  @OnEvent('room.updated')
  handleRoomUpdated(payload: any) {
    this.server.emit('room_updated', payload);
  }


  @SubscribeMessage('get_rooms')
  async handleGetRooms() {
    const rooms = await this.roomsService.GetAllRooms();
    this.server.emit('rooms_list', rooms);
    return rooms;
  }

}

