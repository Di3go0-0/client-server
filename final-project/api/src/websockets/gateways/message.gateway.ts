import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from './services/users.service';
import { MessagesService } from 'src/modules/messages/messages.service';
import type { SendMessageType } from './types/send-message.type';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersConnected: UsersService,
  ) { }

  @SubscribeMessage('messages.suscribe')
  async handleMessageSubscribe(
    @MessageBody() { id }: { id: number },
    @ConnectedSocket() client: Socket
  ) {
    const roomMessages = `m_room_id_${id}`;
    client.join(roomMessages);
    const messages = await this.messagesService.getMesagesByRoom(id);

    this.server.to(client.id).emit('messages.suscription', messages);
    // console.log(this.server)
  }

  @SubscribeMessage('users-send.message')
  async handleMessageSuscription(
    @MessageBody() body: SendMessageType,
    @ConnectedSocket() client: Socket
  ) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    const roomMessages = `m_room_id_${body.roomId}`;

    const user = this.usersConnected.getUser(client.id)
    console.log('Usuario conectado:', user, 'clientId:', client.id);
    if (!user) return;

    console.log({ ...body, userId: user.id })
    const message = await this.messagesService.sendMessasge({ ...body, userId: user.id })

    this.server.to(roomMessages).emit('messages.suscription', message);
  }
}
