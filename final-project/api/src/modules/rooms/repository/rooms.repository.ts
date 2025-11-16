import { RoomEntity, RoomsActivesEntity } from "../entities";
import { CreateRoomType } from "../types/create-room-type";
import { RoomUserType } from "../types/exit-room.type";

export abstract class RoomRepository {
  abstract GetAllRooms(): Promise<RoomsActivesEntity[]>;
  abstract GetRoomsByUser(userId: number): Promise<RoomEntity[]>;
  abstract createRoom(body: CreateRoomType): Promise<boolean>;
  abstract exitRoom(body: RoomUserType): Promise<boolean>;
  abstract JoinRoom(body: RoomUserType): Promise<boolean>;
}
