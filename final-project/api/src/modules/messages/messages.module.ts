import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { MessagesDbService, MessagesRepository } from './repository';

@Module({

  imports: [
    DatabaseModule,
  ],
  providers: [
    MessagesService,
    {
      provide: MessagesRepository,
      useClass: MessagesDbService,
    }
  ],
  exports: [MessagesService]
})
export class MessagesModule { }
