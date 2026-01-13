import { Module } from "@nestjs/common";
import { RoomsModule } from "src/modules/rooms/rooms.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { JwtModule } from "src/core/jwt/jwt.module";
import { UsersService } from "./gateways/services/users.service";
import { MessagesModule } from "src/modules/messages/messages.module";
import { DatabaseModule } from "src/core/database/database.module";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [
    AuthModule,
    JwtModule,
    RoomsModule,
    MessagesModule,
    DatabaseModule,
  ],
  providers: [
    ChatGateway,
    UsersService,
  ],
  exports: [
    UsersService,
  ],
})
export class WebSocketModule { }

