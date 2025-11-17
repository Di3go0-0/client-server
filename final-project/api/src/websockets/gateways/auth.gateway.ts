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
import type { LoginType, RegisterType } from 'src/modules/auth/types';

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
    this.usersConnected.removeUser(client.id)
  }

  @SubscribeMessage('auth.login')
  async handleLogin(
    @MessageBody() body: LoginType,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const response = await this.authService.login(body);
      const token = response.token;

      if (!token) {
        return { success: false, message: "Credenciales inválidas" };
      }

      return { success: true, token };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  @SubscribeMessage('auth.register')
  async handleRegister(
    @MessageBody() body: RegisterType,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const response = await this.authService.registerUser(body);

      if (response !== 1) {
        return { success: false, message: "Error to register a user" };
      }

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  @SubscribeMessage('jwt')
  async handleConnectUser(@MessageBody() { jwt }: { jwt: string }, @ConnectedSocket() client: Socket) {
    const result = await this.authService.getUserInfo(jwt);
    const user: UserType = { ...result, clientId: client.id }
    this.usersConnected.addUser(client.id, user)
    client.emit('jwt.success', user);
    console.log('=============================================================================')
    console.log(client.handshake.auth)
  }
}

