import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/core/jwt/jwt.service';
import { DatabaseService } from 'src/core/database/database.service';
import { JwtSql } from 'src/core/jwt-guard/sql/jwt.sql';
import { UserType } from 'src/modules/auth/types';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UsersService } from './gateways/services/users.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { RoomsService } from 'src/modules/rooms/rooms.service';
import { MessagesService } from 'src/modules/messages/messages.service';
import { ROOMS, EVENTS, ERRORS } from './constants/websocket.constants';
import type { LoginType, RegisterType } from 'src/modules/auth/types';
import type { SendMessageType } from './gateways/types/send-message.type';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly dbService: DatabaseService,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
    private readonly roomsService: RoomsService,
    private readonly messagesService: MessagesService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    try {
      const token = client.handshake?.auth?.token;
      if (!token) {
        throw new UnauthorizedException(ERRORS.INVALID_TOKEN);
      }

      const payload = await this.jwtService.verifyToken(token);
      const rows = await this.dbService.executeSelect<UserType>(JwtSql.GetUser, [payload.email]);
      const user = rows[0];

      if (!user) {
        throw new UnauthorizedException(ERRORS.USER_NOT_FOUND);
      }

      client.data = { user };
      this.usersService.addUser(client.id, user);

      this.eventEmitter.emit('user.toggle.connection', user.id);
      this.eventEmitter.emit('update.users.actives');

      this.logger.log(`Client connected: ${client.id} (User: ${user.id})`);
    } catch (error) {
      this.logger.error(`Connection failed for ${client.id}: ${error.message}`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket): void {
    const user = this.usersService.removeUser(client.id);
    if (user) {
      this.eventEmitter.emit('user.toggle.connection', user.id);
      this.eventEmitter.emit('update.users.actives');
      this.logger.log(`Client disconnected: ${client.id} (User: ${user.id})`);
    }
  }

  // Auth events
  @SubscribeMessage(EVENTS.AUTH_LOGIN)
  async handleLogin(@MessageBody() body: LoginType): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const response = await this.authService.login(body);
      if (!response.token) {
        return { success: false, message: 'Credenciales inválidas' };
      }
      return { success: true, token: response.token };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @SubscribeMessage(EVENTS.AUTH_REGISTER)
  async handleRegister(@MessageBody() body: RegisterType): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await this.authService.registerUser(body);
      if (response !== 1) {
        return { success: false, message: 'Error al registrar usuario' };
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Rooms events
  @SubscribeMessage(EVENTS.ROOMS_LIST)
  async handleGetRooms(): Promise<any> {
    try {
      const rooms = await this.roomsService.GetAllRooms();
      this.server.emit(EVENTS.ROOMS_LIST, rooms);
      return rooms;
    } catch (error) {
      this.logger.error(`Error getting rooms: ${error.message}`);
      return [];
    }
  }

  @SubscribeMessage(EVENTS.ROOM_JOIN)
  async handleJoinRoom(@MessageBody() roomId: number, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const user = client.data.user;
      if (!user) return;

      await this.roomsService.JoinRoom({ userId: user.id, roomId });
      
      const roomName = ROOMS.USERS(roomId);
      client.join(roomName);

      const users = await this.getFormattedUsersInRoom(roomId);
      this.server.to(roomName).emit(EVENTS.USERS_ROOM_UPDATED(roomId), users);
    } catch (error) {
      this.logger.error(`Error joining room ${roomId}: ${error.message}`);
    }
  }

  @SubscribeMessage(EVENTS.ROOM_LEAVE)
  async handleLeaveRoom(@MessageBody() roomId: number, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const user = client.data.user;
      if (!user) return;

      await this.roomsService.exitRoom({ userId: user.id, roomId });
      
      const roomName = ROOMS.USERS(roomId);
      client.leave(roomName);

      const users = await this.getFormattedUsersInRoom(roomId);
      this.server.to(roomName).emit(EVENTS.USERS_ROOM_UPDATED(roomId), users);
    } catch (error) {
      this.logger.error(`Error leaving room ${roomId}: ${error.message}`);
    }
  }

  // Messages events
  @SubscribeMessage(EVENTS.MESSAGE_SUBSCRIBE)
  async handleMessageSubscribe(@MessageBody() { id }: { id: number }, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const roomName = ROOMS.MESSAGES(id);
      client.join(roomName);

      const messages = await this.messagesService.getMesagesByRoom(id);
      this.server.to(client.id).emit(EVENTS.MESSAGE_SUBSCRIPTION, messages);
    } catch (error) {
      this.logger.error(`Error subscribing to messages room ${id}: ${error.message}`);
    }
  }

  @SubscribeMessage(EVENTS.MESSAGE_SEND)
  async handleMessageSend(@MessageBody() body: SendMessageType, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const user = client.data.user;
      if (!user) return;

      const message = await this.messagesService.sendMessasge({ ...body, userId: user.id });
      const roomName = ROOMS.MESSAGES(body.roomId);
      
      this.server.to(roomName).emit(EVENTS.MESSAGE_SUBSCRIPTION, message);
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
    }
  }

  // Users events
  @SubscribeMessage(EVENTS.USERS_GLOBAL_SUBSCRIBE)
  async handleUsersGlobalSubscribe(@ConnectedSocket() client: Socket): Promise<void> {
    try {
      client.join(ROOMS.USERS_GLOBAL);
      const users = this.usersService.getAllUsers();
      this.server.to(client.id).emit(EVENTS.USERS_UPDATED, users);
    } catch (error) {
      this.logger.error(`Error subscribing to global users: ${error.message}`);
    }
  }

  @SubscribeMessage(EVENTS.USERS_ROOM_SUBSCRIBE)
  async handleUsersRoomSubscribe(@MessageBody() roomId: number, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const roomName = ROOMS.USERS(roomId);
      client.join(roomName);

      const users = await this.getFormattedUsersInRoom(roomId);
      this.server.to(client.id).emit(EVENTS.USERS_ROOM_UPDATED(roomId), users);
    } catch (error) {
      this.logger.error(`Error subscribing to room users ${roomId}: ${error.message}`);
    }
  }

  // Event listeners
  @OnEvent('user.toggle.connection')
  async handleUserToggledConnection(userId: number): Promise<void> {
    try {
      const roomsByUser = await this.roomsService.GetRoomsByUser(userId);
      for (const room of roomsByUser) {
        const users = await this.getFormattedUsersInRoom(room.id);
        const roomName = ROOMS.USERS(room.id);
        this.server.to(roomName).emit(EVENTS.USERS_ROOM_UPDATED(room.id), users);
      }
    } catch (error) {
      this.logger.error(`Error handling user connection toggle: ${error.message}`);
    }
  }

  @OnEvent('room.created')
  handleRoomCreated(payload: any): void {
    this.server.emit(EVENTS.ROOM_CREATED, payload);
  }

  @OnEvent('room.updated')
  handleRoomUpdated(payload: any): void {
    this.server.emit(EVENTS.ROOM_UPDATED, payload);
  }

  @OnEvent('update.users.actives')
  handleUpdateUsersActives(): void {
    const users = this.usersService.getAllUsers();
    this.server.to(ROOMS.USERS_GLOBAL).emit(EVENTS.USERS_UPDATED, users);
  }

  // Helper methods
  private async getFormattedUsersInRoom(roomId: number): Promise<any[]> {
    try {
      const userDetails = await this.roomsService.GetUsersDetailInRoom(roomId);
      return userDetails.map(user => ({
        id: user.user_id,
        userName: user.username,
        email: user.email,
        online: this.usersService.isUserOnline(user.user_id),
      }));
    } catch (error) {
      this.logger.error(`Error getting formatted users for room ${roomId}: ${error.message}`);
      return [];
    }
  }
}