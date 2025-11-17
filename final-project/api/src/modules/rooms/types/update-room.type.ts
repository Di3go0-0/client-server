import { RoomUserType } from "./exit-room.type";

export type UpdateRoomType = RoomUserType & {
  name: string;
  description: string;
}
