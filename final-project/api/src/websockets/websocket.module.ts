import { Module } from "@nestjs/common";
import { RoomsGateway } from "./gateways/rooms.gateway";
import { RoomsModule } from "src/modules/rooms/rooms.module";
import { AuthGateway } from "./gateways/auth.gateway";
import { AuthModule } from "src/modules/auth/auth.module";
import { UsersService } from "./gateways/services/users.service";
import { MessageGateway } from "./gateways/message.gateway";
import { MessagesModule } from "src/modules/messages/messages.module";
import { JwtGuardModule } from "src/core/jwt-guard/jwt-guard.module";
import { DatabaseModule } from "src/core/database/database.module";
import { GlobalGateway } from "./websocket.gateway";
import { UsersGateway } from "./gateways/users.gateway";

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    MessagesModule,
    DatabaseModule,
    JwtGuardModule,
  ],
  providers: [
    GlobalGateway,
    RoomsGateway,
    AuthGateway,
    MessageGateway,
    UsersService,
    UsersGateway
  ],
})
export class WebSocketModule { }

