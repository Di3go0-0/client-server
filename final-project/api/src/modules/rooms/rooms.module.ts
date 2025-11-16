import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomDbService, RoomRepository } from './repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { JwtGuardModule } from 'src/core/jwt-guard/jwt-guard.module';

@Module({
  imports: [DatabaseModule, JwtGuardModule],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    {
      provide: RoomRepository,
      useClass: RoomDbService,
    }
  ]
})
export class RoomsModule { }
