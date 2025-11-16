import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class RoomIdDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Room`s Id',
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;
}
