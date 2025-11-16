import { Module } from '@nestjs/common';
import { JwtGuardService } from './jwt-guard.service';
import { JwtModule } from '../jwt/jwt.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
  ],
  providers: [JwtGuardService],
  exports: [JwtGuardService, JwtModule]
})
export class JwtGuardModule { }
