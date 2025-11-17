import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MessagesRepository } from "../messages.repository";
import { DatabaseService } from "src/core/database/database.service";
import { SendMessageType } from "../../types/send-message.type";
import { MessageEntity } from "../../entities/message.entity";
import { MessagesSql } from "../../sql/messages.sql";

@Injectable()
export class MessagesDbService implements MessagesRepository {
  private readonly logger = new Logger(MessagesDbService.name);

  constructor(
    private readonly dbService: DatabaseService,
  ) { }

  async sendMessasge(body: SendMessageType): Promise<MessageEntity> {
    try {
      await this.dbService.executeProcedure(
        MessagesSql.SendMensaje,
        [body.userId, body.roomId, body.message]
      );

      const messageId = await this.dbService.executeSelect<{ message_id: number }>(MessagesSql.GetIdSendMensaje)

      const message = await this.dbService.executeSelect<MessageEntity>(
        MessagesSql.GetMessage,
        [messageId[0].message_id]
      )

      return message[0]
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMesagesByRoom(roomId: number): Promise<MessageEntity[]> {
    try {
      const message = await this.dbService.executeSelect<MessageEntity>(
        MessagesSql.GetMessageByRoom,
        [roomId]
      )

      return message
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
