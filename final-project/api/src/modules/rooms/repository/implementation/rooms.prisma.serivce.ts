import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { RoomRepository } from "../rooms.repository";
import { CreateRoomType } from "../../types/create-room-type";
import { RoomsSql } from "../../sql/rooms.sql";
import { RoomUserType } from "../../types/exit-room.type";
import { RoomEntity } from "../../entities";

@Injectable()
export class RoomDbService implements RoomRepository {
  private readonly logger = new Logger(RoomDbService.name);

  constructor(
    private readonly dbService: DatabaseService,
  ) { }


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


  async createRoom(body: CreateRoomType): Promise<boolean> {
    try {
      const rows = await this.dbService.executeProcedure(
        RoomsSql.CreateRoom,
        [
          body.owner_id,
          body.name,
          body.description
        ]
      )

      return true
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

}
