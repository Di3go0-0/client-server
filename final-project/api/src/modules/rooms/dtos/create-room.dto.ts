import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    example: 'Full Stack',
    required: true,
    description: 'Room`s Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Rooms to full stack people',
    required: true,
    description: 'Rooms`s Description',
  })
  @IsNotEmpty()
  description: string;

}
