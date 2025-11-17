import { IntersectionType } from "@nestjs/swagger";
import { CreateRoomDto } from "./create-room.dto";
import { RoomIdDto } from "./room-id.dto";

export class UpdateRoomDto extends IntersectionType(CreateRoomDto, RoomIdDto) { }
