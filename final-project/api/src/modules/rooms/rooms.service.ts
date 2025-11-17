import { Injectable, Logger } from '@nestjs/common';
import { RoomRepository } from './repository';
import { CreateRoomType } from './types/create-room-type';
import { RoomUserType } from './types/exit-room.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateRoomType } from './types/update-room.type';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    private roomRepository: RoomRepository,
    private readonly eventEmitter: EventEmitter2
  ) { }


  async GetAllRooms() {
    return await this.roomRepository.GetAllRooms()
  }

  async GetRoomsByUser(userId: number) {
    return await this.roomRepository.GetRoomsByUser(userId)
  }

  async createRoom(body: CreateRoomType) {
    const response = await this.roomRepository.createRoom(body)
    this.eventEmitter.emit('room.created', response);
    return response
  }

  async udpateRoom(body: UpdateRoomType) {
    const response = await this.roomRepository.updateRoom(body)
    this.eventEmitter.emit('room.updated', {
      id: body.roomId,
      name: body.name,
      description: body.description,
      owner_id: body.userId
    })

    return response
  }

  async exitRoom(body: RoomUserType) {
    return await this.roomRepository.exitRoom(body)
  }

  async JoinRoom(body: RoomUserType) {
    return await this.roomRepository.JoinRoom(body)
  }


  async GetUsersIdInRoom(roomId: number) {
    return await this.roomRepository.GetUsersInRoom(roomId)
  }

  async GetUsersDetailInRoom(roomId: number) {
    return await this.roomRepository.GetUsersInRoom(roomId)
  }

}
