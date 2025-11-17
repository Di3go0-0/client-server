import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';
import type { LoginType, RegisterType } from 'src/modules/auth/types';

@WebSocketGateway({ cors: { origin: '*' } })
export class AuthGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) { }

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
}

