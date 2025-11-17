import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { RoomRepository } from "../rooms.repository";
import { CreateRoomType } from "../../types/create-room-type";
import { RoomsSql } from "../../sql/rooms.sql";
import { RoomUserType } from "../../types/exit-room.type";
import { RoomEntity, RoomsActivesEntity } from "../../entities";
import { UpdateRoomType } from "../../types/update-room.type";

@Injectable()
export class RoomDbService implements RoomRepository {
  private readonly logger = new Logger(RoomDbService.name);

  constructor(
    private readonly dbService: DatabaseService,
  ) { }

  async GetAllRooms(): Promise<RoomsActivesEntity[]> {
    try {
      const rooms = await this.dbService.executeSelect<RoomsActivesEntity>(
        RoomsSql.getRoomsActives,
      )

      return rooms;
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async GetRoomsByUser(userId: number): Promise<RoomEntity[]> {
    try {
      const rooms = await this.dbService.executeSelect<RoomEntity>(
        RoomsSql.GetRoomByUser,
        [userId]
      )

      return rooms;
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async createRoom(body: CreateRoomType): Promise<RoomEntity> {
    try {
      await this.dbService.executeProcedure(
        RoomsSql.CreateRoom,
        [
          body.owner_id,
          body.name,
          body.description
        ]
      )
      const roomId = await this.dbService.executeSelect<{ room_id: number }>(
        RoomsSql.GetIdCreatedRoom
      )

      const Room = await this.dbService.executeSelect<RoomEntity>(
        RoomsSql.GetRoomById,
        [roomId[0].room_id]
      )

      return Room[0]

    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRoom(body: UpdateRoomType): Promise<RoomEntity> {
    try {
      await this.dbService.executeProcedure(
        RoomsSql.updateRoom,
        [
          body.roomId,
          body.userId,
          body.name,
          body.description
        ]
      )

      const Room = await this.dbService.executeSelect<RoomEntity>(
        RoomsSql.GetRoomById,
        [body.roomId]
      )

      return Room[0]
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async exitRoom(body: RoomUserType): Promise<boolean> {
    try {
      const rows = await this.dbService.executeProcedure(
        RoomsSql.ExitRoom,
        [body.userId, body.roomId]
      )

      return true
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async JoinRoom(body: RoomUserType): Promise<boolean> {
    try {
      const rows = await this.dbService.executeProcedure(
        RoomsSql.JoinRoom,
        [body.userId, body.roomId]
      )

      return true
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async GetUsersInRoom(roomId: number): Promise<number[]> {
    try {
      const rows = await this.dbService.executeSelect<{ user_id: number }>(
        RoomsSql.getUsersIdInRoom,
        [roomId]
      );

      return rows.map(row => row.user_id);
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
