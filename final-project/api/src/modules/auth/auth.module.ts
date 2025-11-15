import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthDbService, AuthRepository } from './repository';
import { JwtModule } from 'src/core/jwt/jwt.module';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
  ],
  providers: [
    AuthService,
    {
      provide: AuthRepository,
      useClass: AuthDbService,
    }
  ],
  controllers: [AuthController]
})
export class AuthModule { }
