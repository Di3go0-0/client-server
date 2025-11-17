import { Module } from "@nestjs/common";
import { WebSocketGateway } from "./websocket.gateway";
import { RoomsGateway } from "./gateways/rooms.gateway";
import { RoomsModule } from "src/modules/rooms/rooms.module";

@Module({
  imports: [RoomsModule],
  providers: [WebSocketGateway, RoomsGateway],
})
export class WebSocketModule { }

