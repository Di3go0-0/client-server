import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './repository';
import { SendMessageType } from './types/send-message.type';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesDbService: MessagesRepository) { }

  async sendMessasge(body: SendMessageType): Promise<MessageEntity> {
    console.log(body)
    return await this.messagesDbService.sendMessasge(body)
  }

  async getMesagesByRoom(roomId: number): Promise<MessageEntity[]> {
    return await this.messagesDbService.getMesagesByRoom(roomId)
  }
}
