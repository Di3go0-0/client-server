import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from './services/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtSocketGuardService } from 'src/core/jwt-guard/jwt-socket-guard.service';
import { OnEvent } from '@nestjs/event-emitter';

@UseGuards(JwtSocketGuardService)
@WebSocketGateway({ cors: { origin: '*' } })
export class UsersGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly usersConnected: UsersService,
  ) { }

  @SubscribeMessage('users.actives.subscribe')
  async handleUsersSubscribe(
    @ConnectedSocket() client: Socket
  ) {
    const usersActives = `users_actives`;
    client.join(usersActives);
    const arr = this.usersConnected.getAllUsers();
    const users = [...arr.values()];

    this.server.to(client.id).emit('users.updated', users);
  }


  @OnEvent('update.users.actives')
  async handleCreated() {
    const usersActives = `users_actives`;
    const usersMap = this.usersConnected.getAllUsers();
    const users = [...usersMap.values()];

    this.server.to(usersActives).emit('users.updated', users);
  }


}

