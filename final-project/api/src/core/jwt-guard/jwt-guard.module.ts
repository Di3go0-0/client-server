import { Module } from '@nestjs/common';
import { JwtGuardService } from './jwt-guard.service';
import { JwtModule } from '../jwt/jwt.module';
import { DatabaseModule } from '../database/database.module';
import { JwtSocketGuardService } from './jwt-socket-guard.service';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
  ],
  providers: [JwtGuardService, JwtSocketGuardService],
  exports: [JwtGuardService, JwtModule, JwtSocketGuardService]
})
export class JwtGuardModule { }
