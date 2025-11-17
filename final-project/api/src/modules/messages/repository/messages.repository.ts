import { MessageEntity } from "../entities/message.entity";
import { SendMessageType } from "../types/send-message.type";

export abstract class MessagesRepository {
  abstract sendMessasge(body: SendMessageType): Promise<MessageEntity>;
  abstract getMesagesByRoom(roomId: number): Promise<MessageEntity[]>;
}
