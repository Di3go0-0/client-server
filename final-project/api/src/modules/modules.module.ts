import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    MessagesModule,
  ],
})
export class ModulesModule { }
