import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MysqlService } from './services/mysql.service';
import { ConstansModule } from '../constans/constans.module';

@Module({
  imports: [ConstansModule],
  providers: [
    DatabaseService,
    MysqlService
  ],
  exports: [DatabaseService],
})
export class DatabaseModule { }
