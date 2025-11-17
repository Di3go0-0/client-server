import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../../modules/rooms/rooms.service';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersService } from './services/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtSocketGuardService } from 'src/core/jwt-guard/jwt-socket-guard.service';

@UseGuards(JwtSocketGuardService)
@WebSocketGateway({ cors: { origin: '*' } })
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersConnected: UsersService,
  ) { }

  // Obtener todas las Rooms
  @SubscribeMessage('get_rooms')
  async handleGetRooms() {
    const rooms = await this.roomsService.GetAllRooms();
    this.server.emit('rooms_list', rooms);
    return rooms;
  }

  // NoTificar cuando se agrega una room
  @OnEvent('room.created')
  handleRoomCreated(payload: any) {
    this.server.emit('room_created', payload);
  }

  // Notificar cuando se quita una room
  @OnEvent('room.updated')
  handleRoomUpdated(payload: any) {
    this.server.emit('room_updated', payload);
  }

  // Usuario entra a una room
  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() { roomId }: { roomId: number },
    @ConnectedSocket() client: Socket
  ) {
    const user = this.usersConnected.getUser(client.id)
    if (!user) return

    await this.roomsService.JoinRoom({ userId: user.id, roomId })

    const usersActivesInRoom = `users_active_room_id_${roomId}`;
    client.join(usersActivesInRoom);

    const ids = await this.roomsService.GetUsersIdInRoom(roomId);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    // Notificar a todos los suscriptores de la sala
    this.server.to(usersActivesInRoom).emit('users.room.updated', users);
  }

  // Usuario sale de una room
  @SubscribeMessage('left_room')
  async handleLeftRoom(
    @MessageBody() { roomId }: { roomId: number },
    @ConnectedSocket() client: Socket
  ) {
    const user = this.usersConnected.getUser(client.id)
    if (!user) return

    await this.roomsService.exitRoom({ userId: user.id, roomId })

    const usersActivesInRoom = `users_active_room_id_${roomId}`;
    client.leave(usersActivesInRoom);

    const ids = await this.roomsService.GetUsersIdInRoom(roomId);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    this.server.to(usersActivesInRoom).emit('users.room.updated', users);
  }

  // Suscribirse a los usuario conectados en una sala especifica
  @SubscribeMessage('users.room.subscribe')
  async handleUsersSubscribe(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket
  ) {
    const usersActivesInRoom = `users_active_room_id_${id}`;
    client.join(usersActivesInRoom);
    const ids = await this.roomsService.GetUsersIdInRoom(id);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    this.server.to(client.id).emit('users.room.updated', users);
  }

  // Notificar a los clientes suscritos de los usuarios activos en una sala
  @OnEvent('update.user.room')
  async handleCreated(
    @MessageBody() id: number
  ) {
    const roomIdUsers = `users_active_room_id_${id}`;

    const ids = await this.roomsService.GetUsersIdInRoom(id);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    // Mandas la nueva lista a TODOS los subscriptores
    this.server.to(roomIdUsers).emit('users.room.updated', users);
  }
}

