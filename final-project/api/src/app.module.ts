import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { WebSocketModule } from './websockets/websocket.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    ModulesModule,
    CoreModule,
    WebSocketModule,
  ],
})
export class AppModule { }
