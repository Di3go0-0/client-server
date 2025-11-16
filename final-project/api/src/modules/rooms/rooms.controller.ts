import { Body, Controller, Delete, Get, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuardService } from 'src/core/jwt-guard/jwt-guard.service';
import { RoomIdDto } from './dtos/room-id.dto';

@ApiTags('Rooms')
@ApiBearerAuth('Token')
@UseGuards(JwtGuardService)
@Controller('rooms')
export class RoomsController {
  private readonly logger = new Logger(RoomsController.name);

  constructor(
    private readonly roomsService: RoomsService,
  ) { }

  @Get('by-user')
  async getRoomsByUser(@Request() req: any) {
    console.log(req.user.id)
    return await this.roomsService.GetRoomsByUser(req.user.id);
  }

  @Post('create')
  async createRoom(@Request() req: any, @Body() body: CreateRoomDto) {
    return await this.roomsService.createRoom({ ...body, owner_id: req.user.id });
  }

  @Post('join')
  async JoinRoom(@Request() req: any, @Query() body: RoomIdDto) {
    return await this.roomsService.JoinRoom({ ...body, userId: req.user.id });
  }

  @Delete('exit')
  async ExitRoom(@Request() req: any, @Query() body: RoomIdDto) {
    return await this.roomsService.exitRoom({ ...body, userId: req.user.id });
  }
}
