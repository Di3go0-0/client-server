import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../../modules/rooms/rooms.service';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersService } from './services/users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersConnected: UsersService,
  ) { }


  @OnEvent('user.join.room')
  handleRoomCreated() {
    this.server.emit('room_created');
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

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() { roomId }: { roomId: number },
    @ConnectedSocket() client: Socket
  ) {
    const user = this.usersConnected.getUser(client.id)
    if (!user) return

    await this.roomsService.JoinRoom({ userId: user.id, roomId })

    const roomSocketId = `room_id_${roomId}`;
    client.join(roomSocketId);

    const ids = await this.roomsService.GetUsersInRoom(roomId);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    // Notificar a todos los suscriptores de la sala
    this.server.to(roomSocketId).emit('users.room.updated', users);
  }

  @SubscribeMessage('left_room')
  async handleLeftRoom(
    @MessageBody() { roomId }: { roomId: number },
    @ConnectedSocket() client: Socket
  ) {
    const user = this.usersConnected.getUser(client.id)
    if (!user) return

    await this.roomsService.exitRoom({ userId: user.id, roomId })

    const roomSocketId = `room_id_${roomId}`;
    client.leave(roomSocketId);

    const ids = await this.roomsService.GetUsersInRoom(roomId);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    this.server.to(roomSocketId).emit('users.room.updated', users);
  }


  @SubscribeMessage('users.room.subscribe')
  async handleFilmSubscribe(
    @MessageBody() { id }: { id: number },
    @ConnectedSocket() client: Socket
  ) {
    const roomIdUsers = `room_id_${id}`;
    client.join(roomIdUsers);
    const ids = await this.roomsService.GetUsersInRoom(id);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    this.server.to(client.id).emit('users.room.updated', users);
  }

  @OnEvent('update.user.room')
  async handleFilmCreated(id: number) {
    const roomIdUsers = `room_id_${id}`;

    const ids = await this.roomsService.GetUsersInRoom(id);
    const users = ids.map(id => this.usersConnected.getUserById(id));

    // Mandas la nueva lista a TODOS los subscriptores
    this.server.to(roomIdUsers).emit('users.room.updated', users);
  }
}

