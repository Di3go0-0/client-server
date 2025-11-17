import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserType } from './types/user.type';
import { UsersService } from './services/users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly usersConnected: UsersService,
  ) {
  }


  handleConnection(client: Socket) {
    // console.log(`🔌 Client connected: ${client.id}`);

  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
    this.usersConnected.removeUser(client.id)
  }


  @SubscribeMessage('jwt')
  async handleConnectUser(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(data)
    const result = await this.authService.getUserInfo(data);
    const user: UserType = { ...result, clientId: client.id }
    this.usersConnected.addUser(client.id, user)
  }

}

