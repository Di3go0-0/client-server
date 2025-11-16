import { Injectable, Logger } from '@nestjs/common';
import { RoomRepository } from './repository';
import { CreateRoomType } from './types/create-room-type';
import { RoomUserType } from './types/exit-room.type';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private roomRepository: RoomRepository,
  ) { }

  async GetRoomsByUser(userId: number) {
    return await this.roomRepository.GetRoomsByUser(userId)
  }

  async createRoom(body: CreateRoomType) {
    return await this.roomRepository.createRoom(body)
  }

  async exitRoom(body: RoomUserType) {
    return await this.roomRepository.exitRoom(body)
  }

  async JoinRoom(body: RoomUserType) {
    return await this.roomRepository.JoinRoom(body)
  }

}
