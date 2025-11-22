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

  // Obtener usuarios activos y no activos de una room
  private async getFormattedUsersInRoom(id: number) {
    const userDetails = await this.roomsService.GetUsersDetailInRoom(id);
    return userDetails.map(user => ({
      id: user.user_id,
      userName: user.username,
      email: user.email,
      online: !!this.usersConnected.getUserById(user.user_id),
    }));
  }

  private async notifyToggleUserOnlineAllHisRooms(userId: number) {
    const roomsByUser = await this.roomsService.GetRoomsByUser(userId);
    for (const room of roomsByUser) {
      const users = await this.getFormattedUsersInRoom(room.id);

      const usersActivesInRoom = `users.room.updated.room_${room.id}`;
            this.server.to(usersActivesInRoom).emit(`users.room.updated.room_${room.id}`, users);
    }
  }

  @OnEvent('user.toogle.connection')
  async handleUserToggledConnection(userId: number) {
    await this.notifyToggleUserOnlineAllHisRooms(userId);
  }


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
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket
  ) {
    const user = this.usersConnected.getUser(client.id)
    if (!user) return

    await this.roomsService.JoinRoom({ userId: user.id, roomId })

    const usersActivesInRoom = `users.room.updated.room_${roomId}`;
    client.join(usersActivesInRoom);

    const users = await this.getFormattedUsersInRoom(roomId);

    // Notificar a todos los suscriptores de la sala
        this.server.to(usersActivesInRoom).emit(`users.room.updated.room_${roomId}`, users);
  }

  // Usuario sale de una room
  @SubscribeMessage('left_room')
  async handleLeftRoom(
    @MessageBody() roomId: number,
    @ConnectedSocket() client: Socket
  ) {
    const user = this.usersConnected.getUser(client.id)
    if (!user) return

    await this.roomsService.exitRoom({ userId: user.id, roomId })

    const usersActivesInRoom = `users.room.updated.room_${roomId}`;
    client.leave(usersActivesInRoom);

    const users = await this.getFormattedUsersInRoom(roomId);

    this.server.to(usersActivesInRoom).emit(`users.room.updated.room_${roomId}`, users);
  }

  // Suscribirse a los usuario conectados en una sala especifica
  @SubscribeMessage('users.room.subscribe')
  async handleUsersSubscribe(
    @MessageBody() id: number,
    @ConnectedSocket() client: Socket
  ) {
    const usersActivesInRoom = `users.room.updated.room_${id}`;
    client.join(usersActivesInRoom);


    const users = await this.getFormattedUsersInRoom(id);

    this.server.to(client.id).emit(`users.room.updated.room_${id}`, users);
  }

  // Notificar a los clientes suscritos de los usuarios activos en una sala
  @OnEvent('update.user.room')
  async handleCreated(
    @MessageBody() id: number
  ) {
    const roomIdUsers = `users.room.updated.room_${id}`;

    const users = await this.getFormattedUsersInRoom(id);

    // Mandas la nueva lista a TODOS los subscriptores
    this.server.to(roomIdUsers).emit(`users.room.updated.room_${id}`, users);
  }
}

