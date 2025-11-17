import { RoomEntity, RoomsActivesEntity } from "../entities";
import { CreateRoomType } from "../types/create-room-type";
import { RoomUserType } from "../types/exit-room.type";
import { UpdateRoomType } from "../types/update-room.type";
import { UsersInRoomType } from "../types/users-room.type";

export abstract class RoomRepository {
  abstract GetAllRooms(): Promise<RoomsActivesEntity[]>;
  abstract GetRoomsByUser(userId: number): Promise<RoomEntity[]>;
  abstract createRoom(body: CreateRoomType): Promise<RoomEntity>;
  abstract updateRoom(body: UpdateRoomType): Promise<RoomEntity>;
  abstract exitRoom(body: RoomUserType): Promise<boolean>;
  abstract JoinRoom(body: RoomUserType): Promise<boolean>;
  abstract GetUsersInRoom(roomId: number): Promise<UsersInRoomType[]>;
}
