import { Module } from "@nestjs/common";
import { WebSocketGateway } from "./websocket.gateway";
import { RoomsGateway } from "./gateways/rooms.gateway";
import { RoomsModule } from "src/modules/rooms/rooms.module";
import { AuthGateway } from "./gateways/auth.gateway";
import { AuthModule } from "src/modules/auth/auth.module";
import { UsersService } from "./gateways/services/users.service";
import { MessageGateway } from "./gateways/message.gateway";
import { MessagesModule } from "src/modules/messages/messages.module";

@Module({
  imports: [
    AuthModule,
    RoomsModule,
    MessagesModule,
  ],
  providers: [
    WebSocketGateway,
    RoomsGateway,
    AuthGateway,
    MessageGateway,
    UsersService,
  ],
})
export class WebSocketModule { }

